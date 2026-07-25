import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import type { Decision } from "../../types/decision";
import { getDecisionRecommendation } from "../../utils/decisionRecommendation";

const TYPE_STYLES = {
  positive: {
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    badge: "Strong candidate",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-600 dark:text-amber-400",
    badge: "Review required",
  },
  neutral: {
    icon: Info,
    iconClass: "text-[var(--text-muted)]",
    badge: "Worth a closer look",
  },
} as const;

export default function RecommendationCard({ decision }: { decision: Decision }) {
  const recommendation = getDecisionRecommendation(decision);
  const style = TYPE_STYLES[recommendation.type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
      className="flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5"
    >
      <div className="flex items-center gap-2">
        <Icon size={15} className={style.iconClass} />
        <span className="text-sm font-medium text-[var(--text)]">
          {style.badge}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
        {recommendation.message}
      </p>
    </motion.div>
  );
}
