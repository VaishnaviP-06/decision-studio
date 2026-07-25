import type { Edge, Node } from "@xyflow/react";

export const previewNodes: Node[] = [
  {
    id: "1",
    type: "decision",
    position: { x: 260, y: 0 },
    data: {
      title: "Product Launch",
      confidence: 92,
      risk: "Low",
      cost: "$15K",
      color: "#6366F1",
    },
  },
  {
    id: "2",
    type: "decision",
    position: { x: 0, y: 240 },
    data: {
      title: "Budget Review",
      confidence: 84,
      risk: "Medium",
      cost: "$8K",
      color: "#F59E0B",
    },
  },
  {
    id: "3",
    type: "decision",
    position: { x: 520, y: 240 },
    data: {
      title: "Market Analysis",
      confidence: 90,
      risk: "Low",
      cost: "$12K",
      color: "#10B981",
    },
  },
  {
    id: "4",
    type: "decision",
    position: { x: 260, y: 500 },
    data: {
      title: "Final Recommendation",
      confidence: 95,
      risk: "Low",
      cost: "-",
      color: "#EC4899",
    },
  },
];

export const previewEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "1-3",
    source: "1",
    target: "3",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "2-4",
    source: "2",
    target: "4",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "3-4",
    source: "3",
    target: "4",
    animated: true,
    type: "smoothstep",
  },
];