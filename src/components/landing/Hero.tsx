import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DecisionPreview from "../canvas/DecisionPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm">
            <Sparkles
              size={16}
              className="text-[var(--primary)]"
            />
            Decision Intelligence Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
            <span className="whitespace-nowrap">
              Visualize{" "}
              <span className="text-[var(--primary)]">Better</span>
            </span>
            <br />
            Decisions.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
            Transform complex decisions into interactive visual workflows.
            Connect ideas, evaluate trade-offs, and make smarter choices with
            clarity.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-medium text-white transition hover:scale-105"
            >
              Launch Studio
              <ArrowRight size={18} />
            </Link>

            <button className="rounded-xl border border-[var(--border)] px-6 py-3 transition hover:bg-[var(--surface-secondary)]">
              Learn More
            </button>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Decision Maps
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Templates
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">∞</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Possibilities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative h-[500px] w-full max-w-xl lg:-translate-y-4"
        >
          {/* Soft Glow */}
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-3xl" />

          {/* Preview */}
          <div className="relative h-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <DecisionPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}