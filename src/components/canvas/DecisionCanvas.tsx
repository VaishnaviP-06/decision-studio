import "@xyflow/react/dist/style.css";

import { useCallback } from "react";
import { Background, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import { motion } from "framer-motion";
import { Plus, Workflow } from "lucide-react";

import { useDecisionStore } from "../../store/decisionStore";
import DecisionNode from "../nodes/DecisionNode";
import RelationshipEdge from "./edges/RelationshipEdge";
import RelationshipPicker from "./RelationshipPicker";

const nodeTypes = {
  decision: DecisionNode,
};

const edgeTypes = {
  relationship: RelationshipEdge,
};

function EmptyCanvasState() {
  const addNode = useDecisionStore((s) => s.addNode);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-auto flex max-w-xs flex-col items-center gap-3 text-center"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <Workflow size={18} className="text-[var(--text-muted)]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--text)]">
            Create your first decision
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Map options, compare trade-offs, and make smarter choices.
          </p>
        </div>

        <button
          onClick={() => addNode()}
          className="mt-1 flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus size={14} />
          Create Decision
        </button>
      </motion.div>
    </div>
  );
}

export default function DecisionCanvas({
  readOnly = false,
}: {
  readOnly?: boolean;
}) {
  const nodes = useDecisionStore((s) => s.nodes);
  const edges = useDecisionStore((s) => s.edges);
  const onNodesChange = useDecisionStore((s) => s.onNodesChange);
  const onEdgesChange = useDecisionStore((s) => s.onEdgesChange);
  const onConnect = useDecisionStore((s) => s.onConnect);
  const selectNode = useDecisionStore((s) => s.selectNode);
  const setPendingEdge = useDecisionStore((s) => s.setPendingEdge);

  const handleNodeClick = useCallback(
    (_: unknown, node: Node) => selectNode(node.id),
    [selectNode]
  );

  const handlePaneClick = useCallback(() => selectNode(null), [selectNode]);

  const handleEdgeClick = useCallback(
    (_: unknown, edge: Edge) => setPendingEdge(edge.id),
    [setPendingEdge]
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={readOnly ? undefined : handleNodeClick}
        onEdgeClick={readOnly ? undefined : handleEdgeClick}
        onPaneClick={readOnly ? undefined : handlePaneClick}
        deleteKeyCode={readOnly ? [] : ["Backspace", "Delete"]}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} />
      </ReactFlow>

      {!readOnly && <RelationshipPicker />}

      {!readOnly && nodes.length === 0 && <EmptyCanvasState />}
    </div>
  );
}
