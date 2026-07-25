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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-2xl"
      style={{
        boxShadow: selected
          ? "0 0 0 2px var(--primary), 0 8px 24px -8px rgba(79, 70, 229, 0.25)"
          : "0 1px 2px rgba(15, 23, 42, 0.04)",
        transition: "box-shadow 200ms ease-out",
      }}
    >
      <DecisionCard data={data} />
    </motion.div>
  );
}
