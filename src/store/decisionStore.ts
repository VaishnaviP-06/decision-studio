import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Connection, Edge, EdgeChange, NodeChange } from "@xyflow/react";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import type { Node } from "@xyflow/react";

import type { Decision, DecisionTemplate, RelationshipType } from "../types/decision";

export type DecisionNodeType = Node<Decision, "decision">;

const PALETTE = ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#0EA5E9", "#A855F7"];

function makeId() {
  return `decision-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function toNode(decision: Decision): DecisionNodeType {
  return {
    id: decision.id,
    type: "decision",
    position: decision.position,
    data: decision,
  };
}

type DecisionStore = {
  nodes: DecisionNodeType[];
  edges: Edge[];
  selectedNodeId: string | null;
  pendingEdgeId: string | null;
  presentationMode: boolean;

  addNode: (partial?: Partial<Decision>) => string;
  deleteNode: (id: string) => void;
  updateNode: (id: string, patch: Partial<Decision>) => void;
  selectNode: (id: string | null) => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  setPendingEdge: (id: string | null) => void;
  setEdgeRelationship: (id: string, relationship: RelationshipType) => void;

  arrangeNodes: () => void;
  setPresentationMode: (value: boolean) => void;

  applyTemplate: (template: DecisionTemplate) => void;
  clearCanvas: () => void;

  save: () => void;
  load: () => void;
};

function defaultDecision(partial?: Partial<Decision>): Decision {
  const id = makeId();
  return {
    title: "New Decision",
    description: "",
    pros: [],
    cons: [],
    risk: "Medium",
    confidence: 50,
    cost: "-",
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    notes: "",
    position: { x: 120 + Math.random() * 200, y: 120 + Math.random() * 200 },
    ...partial,
    id,
  };
}

export const useDecisionStore = create<DecisionStore>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      pendingEdgeId: null,
      presentationMode: false,

      addNode: (partial) => {
        const decision = defaultDecision(partial);
        set((state) => ({
          nodes: [...state.nodes, toNode(decision)],
          selectedNodeId: decision.id,
        }));
        return decision.id;
      },

      deleteNode: (id) => {
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
          edges: state.edges.filter((e) => e.source !== id && e.target !== id),
          selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        }));
      },

      updateNode: (id, patch) => {
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id
              ? {
                  ...n,
                  data: { ...n.data, ...patch },
                  position: patch.position ?? n.position,
                }
              : n
          ),
        }));
      },

      selectNode: (id) => set({ selectedNodeId: id }),

      onNodesChange: (changes) => {
        set((state) => {
          const nodes = applyNodeChanges(changes, state.nodes) as DecisionNodeType[];
          const synced = nodes.map((n) =>
            n.data.position.x === n.position.x && n.data.position.y === n.position.y
              ? n
              : { ...n, data: { ...n.data, position: n.position } }
          );
          return { nodes: synced };
        });
      },

      onEdgesChange: (changes) => {
        set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }));
      },

      onConnect: (connection) => {
        const id = `edge-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        set((state) => ({
          edges: addEdge(
            {
              ...connection,
              id,
              type: "relationship",
              data: { relationship: "supports" },
            },
            state.edges
          ),
          pendingEdgeId: id,
        }));
      },

      setPendingEdge: (id) => set({ pendingEdgeId: id }),

      setEdgeRelationship: (id, relationship) => {
        set((state) => ({
          edges: state.edges.map((e) =>
            e.id === id ? { ...e, data: { ...e.data, relationship } } : e
          ),
        }));
      },

      arrangeNodes: () => {
        set((state) => {
          const spacingY = 200;
          const centerX = 300;

          // Simple top-to-bottom arrangement: sort by existing y so relative
          // order feels stable, then space nodes evenly in a single column.
          const ordered = [...state.nodes].sort(
            (a, b) => a.position.y - b.position.y
          );

          const arranged = ordered.map((n, i) => {
            const position = { x: centerX, y: 80 + i * spacingY };
            return { ...n, position, data: { ...n.data, position } };
          });

          // Preserve original array order for stable selection/list rendering,
          // just with updated positions.
          const byId = new Map(arranged.map((n) => [n.id, n]));
          const nodes = state.nodes.map((n) => byId.get(n.id) ?? n);

          return { nodes };
        });
      },

      setPresentationMode: (value) => set({ presentationMode: value }),

      applyTemplate: (template) => {
        const base = { x: 160, y: 80 };
        const created: Decision[] = template.nodes.map((n) => ({
          id: makeId(),
          title: n.title,
          description: n.description ?? "",
          pros: [],
          cons: [],
          risk: n.risk,
          confidence: n.confidence,
          cost: n.cost,
          color: n.color,
          notes: "",
          position: { x: base.x + n.offset.x, y: base.y + n.offset.y },
        }));

        const newEdges: Edge[] = template.connections.map(([from, to]) => ({
          id: `${created[from].id}-${created[to].id}`,
          source: created[from].id,
          target: created[to].id,
          type: "relationship",
          data: { relationship: "supports" },
        }));

        set((state) => ({
          nodes: [...state.nodes, ...created.map(toNode)],
          edges: [...state.edges, ...newEdges],
          selectedNodeId: created[0]?.id ?? state.selectedNodeId,
        }));
      },

      clearCanvas: () =>
        set({ nodes: [], edges: [], selectedNodeId: null, pendingEdgeId: null }),

      save: () => {
        // persist middleware writes automatically; exposed for explicit "Save" action
        const { nodes, edges } = get();
        localStorage.setItem(
          "decision-studio-manual-save",
          JSON.stringify({ nodes, edges, savedAt: Date.now() })
        );
      },

      load: () => {
        // hydration is handled automatically by the persist middleware on init
      },
    }),
    {
      name: "decision-studio-storage",
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
);
