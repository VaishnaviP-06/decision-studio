import "@xyflow/react/dist/style.css";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import {
  previewEdges,
  previewNodes,
} from "../../data/decisionPreview";

import DecisionCard from "../nodes/DecisionCard";

const nodeTypes = {
  decision: DecisionCard,
};

export default function DecisionPreview() {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden">
        <ReactFlow
            nodes={previewNodes}
            edges={previewEdges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}>
        <Background gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}