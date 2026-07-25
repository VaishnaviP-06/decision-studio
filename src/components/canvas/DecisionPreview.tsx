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

export default function DecisionPreview() {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden">
      <ReactFlow
        nodes={previewNodes}
        edges={previewEdges}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap zoomable pannable />

        <Controls />

        <Background />
      </ReactFlow>
    </div>
  );
}