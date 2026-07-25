import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Command,
  Download,
  LayoutGrid,
  Play,
  Plus,
  RotateCcw,
  Save,
} from "lucide-react";

import { useDecisionStore } from "../../../store/decisionStore";
import ShortcutHint from "../../common/ShortcutHint";
import {
  exportDecisionMapAsImage,
  exportDecisionMapAsJson,
} from "../../../utils/exportDecisionMap";

export default function DecisionToolbar({
  onOpenPalette,
}: {
  onOpenPalette?: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const addNode = useDecisionStore((s) => s.addNode);
  const clearCanvas = useDecisionStore((s) => s.clearCanvas);
  const save = useDecisionStore((s) => s.save);
  const setPresentationMode = useDecisionStore((s) => s.setPresentationMode);
  const arrangeNodes = useDecisionStore((s) => s.arrangeNodes);
  const nodes = useDecisionStore((s) => s.nodes);
  const edges = useDecisionStore((s) => s.edges);

  function handleExportJson() {
    exportDecisionMapAsJson(nodes, edges);
    setExportOpen(false);
  }

  function handleExportImage() {
    const container = document.querySelector(".react-flow") as HTMLElement | null;
    if (container) exportDecisionMapAsImage(container);
    setExportOpen(false);
  }

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
    <div className="flex items-center gap-2 overflow-x-auto border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
      <button
        onClick={() => addNode()}
        className="flex shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-secondary)]"
      >
        <Plus size={14} />
        Add Decision
        <ShortcutHint keys={["Ctrl", "N"]} />
      </button>

      <button
        onClick={handleClear}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)]"
      >
        <RotateCcw size={14} />
        Clear Canvas
      </button>

      <button
        onClick={arrangeNodes}
        disabled={nodes.length === 0}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)] disabled:opacity-40"
      >
        <LayoutGrid size={14} />
        Arrange
      </button>

      <div className="relative shrink-0">
        <button
          onClick={() => setExportOpen((v) => !v)}
          disabled={nodes.length === 0}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)] disabled:opacity-40"
        >
          <Download size={14} />
          Export
        </button>

        <AnimatePresence>
          {exportOpen && (
            <>
              <div
                onClick={() => setExportOpen(false)}
                className="fixed inset-0 z-30"
              />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-full z-40 mt-1.5 w-44 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-xl"
              >
                <button
                  onClick={handleExportJson}
                  className="block w-full px-3.5 py-2 text-left text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
                >
                  Export as JSON
                </button>
                <button
                  onClick={handleExportImage}
                  className="block w-full px-3.5 py-2 text-left text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
                >
                  Export as Image
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {onOpenPalette && (
        <button
          onClick={onOpenPalette}
          className="hidden shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)] sm:flex"
        >
          <Command size={14} />
          Commands
          <ShortcutHint keys={["Ctrl", "K"]} />
        </button>
      )}

      <button
        onClick={() => setPresentationMode(true)}
        disabled={nodes.length === 0}
        className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text)] disabled:opacity-40"
      >
        <Play size={14} />
        Present
      </button>

      <button
        onClick={handleSave}
        className="flex shrink-0 items-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
        {saved ? <Check size={14} /> : <Save size={14} />}
        {saved ? "Saved" : "Save"}
        <ShortcutHint keys={["Ctrl", "S"]} tone="onPrimary" />
      </button>
    </div>
  );
}
