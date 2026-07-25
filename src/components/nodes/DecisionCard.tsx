import { Handle, Position } from "@xyflow/react";

type DecisionCardData = {
  title: string;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  cost: string;
  color: string;
  pros?: string[];
  cons?: string[];
};

const RISK_STYLES: Record<DecisionCardData["risk"], string> = {
  Low: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  Medium: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  High: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
};

export default function DecisionCard({
  data,
}: {
  data: DecisionCardData;
}) {
  const prosCount = data.pros?.length ?? 0;
  const consCount = data.cons?.length ?? 0;

  return (
    <div className="w-64 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-none !bg-[var(--text-muted)]"
      />

      <div className="mb-3 flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: data.color }}
        />
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Decision
        </span>
      </div>

      <h3 className="mb-4 text-[15px] font-semibold leading-snug text-[var(--text)]">
        {data.title || "Untitled Decision"}
      </h3>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">Confidence</span>
          <span className="font-medium text-[var(--text)]">
            {data.confidence}%
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-secondary)]">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-300 ease-out"
            style={{ width: `${data.confidence}%` }}
          />
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted)]">Risk</span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${RISK_STYLES[data.risk]}`}
          >
            {data.risk}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted)]">Cost</span>
          <span className="font-medium text-[var(--text)]">{data.cost}</span>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-2.5 text-[11px] text-[var(--text-muted)]">
        {prosCount} Pros &bull; {consCount} Cons
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-none !bg-[var(--text-muted)]"
      />
    </div>
  );
}
