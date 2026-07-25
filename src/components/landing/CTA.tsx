import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 p-14 text-center">
        <h2 className="text-4xl font-bold">
          Ready to visualize your next decision?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[var(--text-muted)]">
          Transform uncertainty into clarity with an interactive
          decision workspace built for modern teams.
        </p>

        <Link
          to="/studio"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:scale-105"
        >
          Launch Studio
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}