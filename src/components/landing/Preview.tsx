import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import DecisionPreview from "../canvas/DecisionPreview";

export default function Preview() {
  return (
    <section
      id="preview"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-28"
    >
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          See your decisions,
          <span className="text-[var(--primary)]"> mapped out</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]">
          Every option, trade-off, and dependency laid out on an
          interactive canvas — explore a live example below.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto h-[520px] w-full max-w-5xl overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        <DecisionPreview />
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-medium text-white transition hover:scale-105"
        >
          Try it yourself
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
