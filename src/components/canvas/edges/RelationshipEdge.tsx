import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";

import type { RelationshipType } from "../../../types/decision";

const RELATIONSHIP_STYLES: Record<
  RelationshipType,
  { stroke: string; dash?: string; label: string }
> = {
  supports: { stroke: "#10B981", label: "Supports" },
  depends: { stroke: "#6366F1", dash: "6 4", label: "Depends On" },
  blocks: { stroke: "#F43F5E", dash: "2 4", label: "Blocks" },
  alternative: { stroke: "#A855F7", dash: "10 4 2 4", label: "Alternative" },
};

export default function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps) {
  const relationship =
    (data?.relationship as RelationshipType | undefined) ?? "supports";
  const style = RELATIONSHIP_STYLES[relationship];

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: style.stroke,
          strokeWidth: selected ? 2.5 : 1.75,
          strokeDasharray: style.dash,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          className="pointer-events-none rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[10px] font-medium"
        >
          <span style={{ color: style.stroke }}>{style.label}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
