import type { Node, Edge } from "@xyflow/react";

export const previewNodes: Node[] = [
  {
    id: "1",
    position: { x: 260, y: 0 },
    data: { label: "🚀 Product Launch" },
    type: "default",
  },

  {
    id: "2",
    position: { x: 0, y: 170 },
    data: { label: "💰 Budget" },
  },

  {
    id: "3",
    position: { x: 260, y: 170 },
    data: { label: "📅 Timeline" },
  },

  {
    id: "4",
    position: { x: 520, y: 170 },
    data: { label: "📈 Market Fit" },
  },

  {
    id: "5",
    position: { x: 260, y: 360 },
    data: { label: "✅ Final Decision" },
  },
];

export const previewEdges: Edge[] = [
  { id: "e1", source: "1", target: "2" },
  { id: "e2", source: "1", target: "3" },
  { id: "e3", source: "1", target: "4" },

  { id: "e4", source: "2", target: "5" },
  { id: "e5", source: "3", target: "5" },
  { id: "e6", source: "4", target: "5" },
];