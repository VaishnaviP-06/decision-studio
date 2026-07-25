import { AnimatePresence, motion } from "framer-motion";

import { useDecisionStore } from "../../store/decisionStore";
import type { RelationshipType } from "../../types/decision";

const OPTIONS: { value: RelationshipType; label: string; color: string }[] = [
  { value: "supports", label: "Supports", color: "#10B981" },
  { value: "depends", label: "Depends On", color: "#6366F1" },
  { value: "blocks", label: "Blocks", color: "#F43F5E" },
  { value: "alternative", label: "Alternative", color: "#A855F7" },
];

export default function RelationshipPicker() {
  const pendingEdgeId = useDecisionStore((s) => s.pendingEdgeId);
  const setPendingEdge = useDecisionStore((s) => s.setPendingEdge);
  const setEdgeRelationship = useDecisionStore((s) => s.setEdgeRelationship);

  const open = Boolean(pendingEdgeId);

  function choose(value: RelationshipType) {
    if (!pendingEdgeId) return;
    setEdgeRelationship(pendingEdgeId, value);
    setPendingEdge(null);
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
            onClick={() => setPendingEdge(null)}
            className="absolute inset-0 z-30 bg-black/20"
          />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-6 z-40 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
          >
            <p className="border-b border-[var(--border)] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Relationship
            </p>

            <div className="flex flex-col gap-0.5 p-1.5">
              {OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => choose(option.value)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: option.color }}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
