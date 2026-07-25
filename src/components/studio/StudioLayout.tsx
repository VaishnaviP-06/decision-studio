import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeft, PanelRight, X } from "lucide-react";

import Sidebar from "../layout/Sidebar";
import RightPanel from "../panels/RightPanel";
import DecisionCanvas from "../canvas/DecisionCanvas";
import DecisionToolbar from "./toolbar/DecisionToolbar";
import CommandPalette from "../common/CommandPalette";
import PresentationView from "./PresentationView";
import { useDecisionStore } from "../../store/decisionStore";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

export default function StudioLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const selectedNodeId = useDecisionStore((s) => s.selectedNodeId);
  const presentationMode = useDecisionStore((s) => s.presentationMode);

  useKeyboardShortcuts({ onOpenPalette: () => setPaletteOpen((v) => !v) });

  if (presentationMode) {
    return (
      <AnimatePresence>
        <PresentationView />
      </AnimatePresence>
    );
  }

  return (
    <ReactFlowProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
        {/* Desktop sidebar */}
        <div
          className={`hidden md:block ${sidebarCollapsed ? "md:w-16" : "md:w-72 lg:w-80"} transition-[width] duration-200`}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          />
        </div>

        {/* Center: toolbar + canvas */}
        <div className="flex min-w-0 flex-1 flex-col">
          <DecisionToolbar onOpenPalette={() => setPaletteOpen(true)} />
          <div className="relative flex-1">
            <DecisionCanvas />
          </div>
        </div>

        {/* Desktop inspector */}
        <div className="hidden lg:block lg:w-80">
          <RightPanel />
        </div>

        {/* Mobile bottom action bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-[var(--border)] bg-[var(--surface)] py-2 md:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex flex-col items-center gap-1 px-6 py-1 text-xs text-[var(--text-muted)]"
          >
            <PanelLeft size={18} />
            Decisions
          </button>

          <button
            onClick={() => setMobileInspectorOpen(true)}
            disabled={!selectedNodeId}
            className="flex flex-col items-center gap-1 px-6 py-1 text-xs text-[var(--text-muted)] disabled:opacity-40"
          >
            <PanelRight size={18} />
            Inspector
          </button>
        </div>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 z-50 bg-black/40 md:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25 }}
                className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm md:hidden"
              >
                <div className="relative h-full">
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="absolute right-3 top-3 z-10 rounded-lg bg-[var(--surface-secondary)] p-1.5"
                  >
                    <X size={16} />
                  </button>
                  <Sidebar />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile inspector drawer */}
        <AnimatePresence>
          {mobileInspectorOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileInspectorOpen(false)}
                className="fixed inset-0 z-50 bg-black/40 md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25 }}
                className="fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm md:hidden"
              >
                <div className="relative h-full">
                  <button
                    onClick={() => setMobileInspectorOpen(false)}
                    className="absolute left-3 top-3 z-10 rounded-lg bg-[var(--surface-secondary)] p-1.5"
                  >
                    <X size={16} />
                  </button>
                  <RightPanel />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </ReactFlowProvider>
  );
}
