import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactFlowProvider } from "@xyflow/react";

import { useDecisionStore } from "../../store/decisionStore";
import DecisionCanvas from "../canvas/DecisionCanvas";

export default function PresentationView() {
  const setPresentationMode = useDecisionStore((s) => s.setPresentationMode);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col bg-[var(--background)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3">
        <span className="text-sm font-medium text-[var(--text-muted)]">
          Presentation Mode
        </span>

        <button
          onClick={() => setPresentationMode(false)}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-secondary)]"
        >
          <X size={14} />
          Exit Presentation
        </button>
      </div>

      <div className="relative flex-1">
        <ReactFlowProvider>
          <DecisionCanvas readOnly />
        </ReactFlowProvider>
      </div>
    </motion.div>
  );
}
