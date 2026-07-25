import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

import { useDecisionStore } from "../../store/decisionStore";
import type { RiskLevel } from "../../types/decision";
import DecisionAnalytics from "../analysis/DecisionAnalytics";
import RecommendationCard from "../analysis/RecommendationCard";

const RISK_OPTIONS: RiskLevel[] = ["Low", "Medium", "High"];
const COLOR_OPTIONS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#0EA5E9", "#A855F7"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {title}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--text)] outline-none transition-colors duration-200 focus:border-[var(--primary)]";

export default function RightPanel() {
  const selectedNodeId = useDecisionStore((s) => s.selectedNodeId);
  const node = useDecisionStore((s) =>
    s.nodes.find((n) => n.id === s.selectedNodeId)
  );
  const updateNode = useDecisionStore((s) => s.updateNode);
  const deleteNode = useDecisionStore((s) => s.deleteNode);

  if (!selectedNodeId || !node) {
    return (
      <aside className="flex h-full w-full flex-col items-center justify-center gap-2 border-l border-[var(--border)] bg-[var(--surface)] p-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-[var(--border)]" />
        <p className="text-sm text-[var(--text-muted)]">
          Select a decision
          <br />
          View insights, analyze trade-offs,
          <br />
          and improve decisions.
        </p>
      </aside>
    );
  }

  const data = node.data;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={node.id}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex h-full w-full flex-col gap-6 overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)] p-4"
      >
        <Section title="General">
          <Field label="Title">
            <input
              className={inputClass}
              value={data.title}
              onChange={(e) => updateNode(node.id, { title: e.target.value })}
            />
          </Field>

          <Field label="Description">
            <textarea
              className={`${inputClass} min-h-20 resize-none`}
              value={data.description}
              onChange={(e) =>
                updateNode(node.id, { description: e.target.value })
              }
            />
          </Field>
        </Section>

        <Section title="Analysis">
          <Field label="Risk">
            <div className="flex gap-1.5">
              {RISK_OPTIONS.map((risk) => (
                <button
                  key={risk}
                  onClick={() => updateNode(node.id, { risk })}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors duration-150 ${
                    data.risk === risk
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </Field>

          <Field label={`Confidence — ${data.confidence}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={data.confidence}
              onChange={(e) =>
                updateNode(node.id, { confidence: Number(e.target.value) })
              }
              className="w-full accent-[var(--primary)]"
            />
          </Field>

          <Field label="Cost">
            <input
              className={inputClass}
              value={data.cost}
              onChange={(e) => updateNode(node.id, { cost: e.target.value })}
            />
          </Field>
        </Section>

        <Section title="Tradeoffs">
          <Field label="Pros">
            <textarea
              className={`${inputClass} min-h-16 resize-none`}
              placeholder="One pro per line"
              value={data.pros.join("\n")}
              onChange={(e) =>
                updateNode(node.id, {
                  pros: e.target.value.split("\n").filter(Boolean),
                })
              }
            />
          </Field>

          <Field label="Cons">
            <textarea
              className={`${inputClass} min-h-16 resize-none`}
              placeholder="One con per line"
              value={data.cons.join("\n")}
              onChange={(e) =>
                updateNode(node.id, {
                  cons: e.target.value.split("\n").filter(Boolean),
                })
              }
            />
          </Field>

          <Field label="Notes">
            <textarea
              className={`${inputClass} min-h-16 resize-none`}
              value={data.notes}
              onChange={(e) => updateNode(node.id, { notes: e.target.value })}
            />
          </Field>

          <Field label="Color">
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateNode(node.id, { color })}
                  style={{ background: color }}
                  className={`h-6 w-6 rounded-full transition-transform duration-150 hover:scale-110 ${
                    data.color === color
                      ? "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)]"
                      : ""
                  }`}
                />
              ))}
            </div>
          </Field>
        </Section>

        <Section title="Decision Analytics">
          <DecisionAnalytics decision={data} />
        </Section>

        <Section title="Recommendation">
          <RecommendationCard decision={data} />
        </Section>

        <Section title="Actions">
          <button
            onClick={() => deleteNode(node.id)}
            className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-rose-500 transition-colors duration-150 hover:border-rose-500/40 hover:bg-rose-500/10"
          >
            <Trash2 size={14} />
            Delete Decision
          </button>
        </Section>
      </motion.aside>
    </AnimatePresence>
  );
}
