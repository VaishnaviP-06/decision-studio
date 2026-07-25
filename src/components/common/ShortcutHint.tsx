const KEY_LABELS: Record<string, string> = {
  Ctrl: navigator.platform.includes("Mac") ? "⌘" : "Ctrl",
  Shift: "⇧",
  Alt: navigator.platform.includes("Mac") ? "⌥" : "Alt",
  Enter: "↵",
  Escape: "Esc",
};

export default function ShortcutHint({
  keys,
  tone = "default",
}: {
  keys: string[];
  tone?: "default" | "onPrimary";
}) {
  const toneClasses =
    tone === "onPrimary"
      ? "border-white/25 bg-white/10 text-white/80"
      : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]";

  return (
    <span className="flex items-center gap-0.5">
      {keys.map((key) => (
        <kbd
          key={key}
          className={`rounded border px-1.5 py-0.5 text-[10px] font-medium leading-none ${toneClasses}`}
        >
          {KEY_LABELS[key] ?? key}
        </kbd>
      ))}
    </span>
  );
}
