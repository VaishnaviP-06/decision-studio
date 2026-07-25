import { useEffect } from "react";

import { useDecisionStore } from "../store/decisionStore";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function useKeyboardShortcuts({
  onOpenPalette,
}: { onOpenPalette?: () => void } = {}) {
  const addNode = useDecisionStore((s) => s.addNode);
  const save = useDecisionStore((s) => s.save);
  const deleteNode = useDecisionStore((s) => s.deleteNode);
  const selectNode = useDecisionStore((s) => s.selectNode);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenPalette?.();
        return;
      }

      if (mod && e.key.toLowerCase() === "n") {
        e.preventDefault();
        addNode();
        return;
      }

      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
        return;
      }

      if (e.key === "Escape") {
        selectNode(null);
        return;
      }

      if ((e.key === "Delete" || e.key === "Backspace") && !isTypingTarget(e.target)) {
        const selectedNodeId = useDecisionStore.getState().selectedNodeId;
        if (selectedNodeId) {
          e.preventDefault();
          deleteNode(selectedNodeId);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addNode, save, deleteNode, selectNode, onOpenPalette]);
}
