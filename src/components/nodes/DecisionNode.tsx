import type { NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";

import DecisionCard from "./DecisionCard";
import type { Decision } from "../../types/decision";

export default function DecisionNode({
  data,
  selected,
}: NodeProps & { data: Decision }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: selected ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      className={
        selected
          ? "rounded-2xl ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]"
          : "rounded-2xl"
      }
    >
      <DecisionCard data={data} />
    </motion.div>
  );
}
