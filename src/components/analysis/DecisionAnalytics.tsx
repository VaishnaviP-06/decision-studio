import { motion } from "framer-motion";
import type { ReactNode } from "react";

import type { Decision, RiskLevel } from "../../types/decision";
import { calculateDecisionHealth } from "../../utils/decisionHealth";

const RISK_EXPLANATION: Record<RiskLevel, string> = {
  Low: "Low uncertainty. Decision appears stable.",
  Medium: "Moderate uncertainty. Review trade-offs.",
  High: "High uncertainty. Consider alternatives.",
};

const RISK_DOT: Record<RiskLevel, string> = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-rose-500",
};

function Stat({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
        <span className="text-xs font-medium text-[var(--text)]">{value}</span>
      </div>
      {children}
    </div>
  );
}

export default function DecisionAnalytics({ decision }: { decision: Decision }) {
  const { score, label } = calculateDecisionHealth(decision);
  const prosCount = decision.pros.length;
  const consCount = decision.cons.length;
  const tradeoffTotal = Math.max(prosCount + consCount, 1);
  const prosPct = Math.round((prosCount / tradeoffTotal) * 100);
  const consPct = 100 - prosPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5"
    >
      <Stat label="Decision Confidence" value={`${decision.confidence}%`}>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-secondary)]">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-300 ease-out"
            style={{ width: `${decision.confidence}%` }}
          />
        </div>
      </Stat>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">Risk Level</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--text)]">
            <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT[decision.risk]}`} />
            {decision.risk}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          {RISK_EXPLANATION[decision.risk]}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-[var(--text-muted)]">Trade-off Balance</span>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <span className="w-16 shrink-0">Advantages</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
                style={{ width: `${prosCount > 0 ? prosPct : 0}%` }}
              />
            </div>
            <span className="w-4 text-right text-[var(--text)]">{prosCount}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <span className="w-16 shrink-0">Concerns</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
              <div
                className="h-full rounded-full bg-rose-500 transition-[width] duration-300 ease-out"
                style={{ width: `${consCount > 0 ? consPct : 0}%` }}
              />
            </div>
            <span className="w-4 text-right text-[var(--text)]">{consCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
        <div>
          <p className="text-xs text-[var(--text-muted)]">Decision Health</p>
          <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
        </div>
        <p className="text-lg font-semibold text-[var(--text)]">
          {score}
          <span className="text-xs font-normal text-[var(--text-muted)]">/100</span>
        </p>
      </div>
    </motion.div>
  );
}
