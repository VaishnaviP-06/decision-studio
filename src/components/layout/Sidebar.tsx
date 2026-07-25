import { useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutTemplate,
  Plus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

import { useDecisionStore } from "../../store/decisionStore";
import { decisionTemplates } from "../../data/decisionTemplates";
import ShortcutHint from "../common/ShortcutHint";

export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [showTemplates, setShowTemplates] = useState(true);

  const nodes = useDecisionStore((s) => s.nodes);
  const selectedNodeId = useDecisionStore((s) => s.selectedNodeId);
  const addNode = useDecisionStore((s) => s.addNode);
  const selectNode = useDecisionStore((s) => s.selectNode);
  const applyTemplate = useDecisionStore((s) => s.applyTemplate);

  const filtered = nodes.filter((n) =>
    n.data.title.toLowerCase().includes(query.toLowerCase())
  );

  if (collapsed) {
    return (
      <aside className="flex h-full w-full flex-col items-center gap-3 border-r border-[var(--border)] bg-[var(--surface)] py-4">
        <button
          onClick={() => addNode()}
          title="New Decision"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-white transition-transform duration-200 hover:scale-105"
        >
          <Plus size={16} />
        </button>

        <div className="mt-1 flex flex-1 flex-col items-center gap-2 overflow-y-auto">
          {nodes.map((n) => (
            <button
              key={n.id}
              title={n.data.title}
              onClick={() => selectNode(n.id)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                selectedNodeId === n.id
                  ? "bg-[var(--surface-secondary)]"
                  : "hover:bg-[var(--surface-secondary)]"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: n.data.color }}
              />
            </button>
          ))}
        </div>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Workspace
        </span>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
          >
            <ChevronsLeft size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        <button
          onClick={() => addNode()}
          className="group flex items-center justify-between gap-2 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]"
        >
          <span className="flex items-center gap-2">
            <Plus size={15} />
            New Decision
          </span>
          <ShortcutHint keys={["Ctrl", "N"]} tone="onPrimary" />
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 transition-colors duration-200 focus-within:border-[var(--primary)]">
          <Search size={14} className="shrink-0 text-[var(--text-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search decisions"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Decisions {nodes.length > 0 && `· ${nodes.length}`}
        </p>

        {filtered.length === 0 ? (
          <p className="px-2 py-1.5 text-sm text-[var(--text-muted)]">
            {nodes.length === 0 ? "No decisions yet." : "No matches."}
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {filtered.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => selectNode(n.id)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-left text-sm transition-colors duration-150 ${
                    selectedNodeId === n.id
                      ? "bg-[var(--surface-secondary)] text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: n.data.color }}
                  />
                  <span className="truncate">{n.data.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-[var(--border)] px-2 py-2">
        <button
          onClick={() => setShowTemplates((v) => !v)}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text)]"
        >
          <LayoutTemplate size={13} />
          Templates
        </button>

        {showTemplates && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
            className="mt-1 flex flex-col gap-0.5 overflow-hidden"
          >
            {decisionTemplates.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => applyTemplate(t)}
                  className="w-full rounded-md px-2.5 py-[7px] text-left text-sm text-[var(--text-muted)] transition-colors duration-150 hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
                >
                  {t.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </aside>
  );
}
