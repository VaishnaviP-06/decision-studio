import type { Decision } from "../types/decision";

export type RecommendationType = "positive" | "warning" | "neutral";

export type Recommendation = {
  message: string;
  type: RecommendationType;
};

/**
 * Rule-based recommendation. Deterministic, no backend/AI calls.
 * Checked in priority order: high risk and low confidence are the
 * strongest signals, followed by trade-off balance.
 */
export function getDecisionRecommendation(decision: Decision): Recommendation {
  const { confidence, risk, pros, cons } = decision;

  if (risk === "High") {
    return {
      message: "High risk detected. Review alternatives before proceeding.",
      type: "warning",
    };
  }

  if (confidence < 40) {
    return {
      message: "Confidence is low. Gather more information.",
      type: "warning",
    };
  }

  if (cons.length >= 3 && cons.length > pros.length) {
    return {
      message: "Multiple concerns identified. Evaluate possible improvements.",
      type: "warning",
    };
  }

  if (confidence >= 75 && risk === "Low") {
    return {
      message: "Strong candidate. Consider moving forward.",
      type: "positive",
    };
  }

  return {
    message: "Balanced decision. Weigh the trade-offs carefully.",
    type: "neutral",
  };
}
