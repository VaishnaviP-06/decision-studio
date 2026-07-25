import { useState } from "react";
import { Check, Command, Plus, RotateCcw, Save } from "lucide-react";

import { useDecisionStore } from "../../../store/decisionStore";
import ShortcutHint from "../../common/ShortcutHint";

export default function DecisionToolbar({
  onOpenPalette,
}: {
  onOpenPalette?: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const addNode = useDecisionStore((s) => s.addNode);
  const clearCanvas = useDecisionStore((s) => s.clearCanvas);
  const save = useDecisionStore((s) => s.save);

  function handleSave() {
    save();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleClear() {
    if (window.confirm("Clear the entire canvas? This can't be undone.")) {
      clearCanvas();
    }
  }

  return (
    <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
      <button
        onClick={() => addNode()}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-secondary)]"
      >
        <Plus size={14} />
        Add Decision
        <ShortcutHint keys={["Ctrl", "N"]} />
      </button>

      <button
        onClick={handleClear}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)]"
      >
        <RotateCcw size={14} />
        Clear Canvas
      </button>

      {onOpenPalette && (
        <button
          onClick={onOpenPalette}
          className="hidden items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)] sm:flex"
        >
          <Command size={14} />
          Commands
          <ShortcutHint keys={["Ctrl", "K"]} />
        </button>
      )}

      <button
        onClick={handleSave}
        className="ml-auto flex items-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
        {saved ? <Check size={14} /> : <Save size={14} />}
        {saved ? "Saved" : "Save"}
        <ShortcutHint keys={["Ctrl", "S"]} tone="onPrimary" />
      </button>
    </div>
  );
}
