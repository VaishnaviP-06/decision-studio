import { Handle, Position } from "@xyflow/react";
import {
  CircleDollarSign,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

type DecisionCardData = {
  title: string;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  cost: string;
  color: string;
};

export default function DecisionCard({
  data,
}: {
  data: DecisionCardData;
}) {
  return (
    <div className="w-64 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-xl"
          style={{ background: data.color }}
        />

        <div>
          <h3 className="font-semibold">{data.title}</h3>

          <p className="text-xs text-[var(--text-muted)]">
            Strategic Decision
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span>Confidence</span>

          <span>{data.confidence}%</span>
        </div>

        <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{
              width: `${data.confidence}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-between text-sm">
        <span className="flex items-center gap-1">
          <ShieldAlert size={14} />
          Risk
        </span>

        <span>{data.risk}</span>
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span className="flex items-center gap-1">
          <CircleDollarSign size={14} />
          Cost
        </span>

        <span>{data.cost}</span>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}