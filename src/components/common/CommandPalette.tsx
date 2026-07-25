import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FilePlus2, Moon, RotateCcw, Save, Search, Sun } from "lucide-react";

import { useDecisionStore } from "../../store/decisionStore";

type PaletteAction = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  run: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const addNode = useDecisionStore((s) => s.addNode);
  const save = useDecisionStore((s) => s.save);
  const clearCanvas = useDecisionStore((s) => s.clearCanvas);
  const { resolvedTheme, setTheme } = useTheme();

  function handleClose() {
    setQuery("");
    onClose();
  }

  const actions: PaletteAction[] = useMemo(
    () => [
      {
        id: "create",
        label: "Create Decision",
        icon: FilePlus2,
        run: () => addNode(),
      },
      { id: "save", label: "Save", icon: Save, run: () => save() },
      {
        id: "clear",
        label: "Clear Canvas",
        icon: RotateCcw,
        run: () => {
          if (window.confirm("Clear the entire canvas? This can't be undone.")) {
            clearCanvas();
          }
        },
      },
      {
        id: "theme",
        label: "Toggle Theme",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ],
    [addNode, save, clearCanvas, resolvedTheme, setTheme]
  );

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  function runAction(action: PaletteAction) {
    action.run();
    handleClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/40"
          />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-24 z-[61] w-[90%] max-w-md -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-3.5 py-3">
              <Search size={15} className="shrink-0 text-[var(--text-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) runAction(filtered[0]);
                  if (e.key === "Escape") handleClose();
                }}
                placeholder="Type a command…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-center text-sm text-[var(--text-muted)]">
                  No matching commands.
                </p>
              ) : (
                filtered.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => runAction(action)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
                  >
                    <action.icon size={15} />
                    {action.label}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
