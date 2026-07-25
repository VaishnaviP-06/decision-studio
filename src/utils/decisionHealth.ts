import type { Decision, RiskLevel } from "../types/decision";

const RISK_PENALTY: Record<RiskLevel, number> = {
  Low: 0,
  Medium: 8,
  High: 20,
};

export type DecisionHealth = {
  score: number;
  label: string;
};

/**
 * Rule-based health score, 0-100.
 * Base is confidence, adjusted by pros/cons balance and risk level.
 * No backend, no AI — deterministic and reusable.
 */
export function calculateDecisionHealth(decision: Decision): DecisionHealth {
  const prosBonus = Math.min(decision.pros.length * 4, 20);
  const consPenalty = Math.min(decision.cons.length * 5, 25);
  const riskPenalty = RISK_PENALTY[decision.risk];

  const raw = decision.confidence + prosBonus - consPenalty - riskPenalty;
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  let label: string;
  if (score >= 75) label = "Strong candidate";
  else if (score >= 55) label = "Worth pursuing";
  else if (score >= 35) label = "Needs review";
  else label = "High concern";

  return { score, label };
}
