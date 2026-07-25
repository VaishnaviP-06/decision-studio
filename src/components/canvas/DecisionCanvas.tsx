import "@xyflow/react/dist/style.css";

import { useCallback } from "react";
import { Background, ReactFlow } from "@xyflow/react";
import type { Node } from "@xyflow/react";

import { useDecisionStore } from "../../store/decisionStore";
import DecisionNode from "../nodes/DecisionNode";

const nodeTypes = {
  decision: DecisionNode,
};

export default function DecisionCanvas() {
  const nodes = useDecisionStore((s) => s.nodes);
  const edges = useDecisionStore((s) => s.edges);
  const onNodesChange = useDecisionStore((s) => s.onNodesChange);
  const onEdgesChange = useDecisionStore((s) => s.onEdgesChange);
  const onConnect = useDecisionStore((s) => s.onConnect);
  const selectNode = useDecisionStore((s) => s.selectNode);

  const handleNodeClick = useCallback(
    (_: unknown, node: Node) => selectNode(node.id),
    [selectNode]
  );

  const handlePaneClick = useCallback(() => selectNode(null), [selectNode]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}
