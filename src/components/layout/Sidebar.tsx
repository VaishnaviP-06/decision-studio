import { useState } from "react";
import { LayoutTemplate, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

import { useDecisionStore } from "../../store/decisionStore";
import { decisionTemplates } from "../../data/decisionTemplates";

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  const nodes = useDecisionStore((s) => s.nodes);
  const selectedNodeId = useDecisionStore((s) => s.selectedNodeId);
  const addNode = useDecisionStore((s) => s.addNode);
  const selectNode = useDecisionStore((s) => s.selectNode);
  const applyTemplate = useDecisionStore((s) => s.applyTemplate);

  const filtered = nodes.filter((n) =>
    n.data.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="flex h-full w-full flex-col gap-4 border-r border-[var(--border)] bg-[var(--surface)] p-4">
      <button
        onClick={() => addNode()}
        className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Plus size={16} />
        New Decision
      </button>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2">
        <Search size={14} className="text-[var(--text-muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search decisions"
          className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          Decisions
        </p>

        {filtered.length === 0 ? (
          <p className="px-1 text-sm text-[var(--text-muted)]">
            No decisions yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((n) => (
              <motion.li
                key={n.id}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => selectNode(n.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                    selectedNodeId === n.id
                      ? "bg-[var(--surface-secondary)] text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: n.data.color }}
                  />
                  <span className="truncate">{n.data.title}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-[var(--border)] pt-3">
        <button
          onClick={() => setShowTemplates((v) => !v)}
          className="flex w-full items-center gap-2 px-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]"
        >
          <LayoutTemplate size={14} />
          Templates
        </button>

        {showTemplates && (
          <ul className="mt-2 flex flex-col gap-1">
            {decisionTemplates.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => applyTemplate(t)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
                >
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
