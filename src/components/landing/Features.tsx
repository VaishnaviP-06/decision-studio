import {
  Brain,
  Move,
  Network,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Rich Decision Cards",
    description:
      "Capture pros, cons, risks, confidence, and cost in beautifully designed decision nodes.",
  },
  {
    icon: Network,
    title: "Interactive Connections",
    description:
      "Visualize relationships and dependencies with an intuitive graph-based workspace.",
  },
  {
    icon: Move,
    title: "Drag & Drop Canvas",
    description:
      "Rearrange ideas effortlessly using a smooth zoomable workspace.",
  },
  {
    icon: Sparkles,
    title: "Decision Intelligence",
    description:
      "Structure complex thinking into clear visual workflows for smarter outcomes.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Everything you need to make
          <span className="text-[var(--primary)]">
            {" "}
            smarter decisions
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]">
          Decision Studio combines visual thinking, structured analysis,
          and interactive workflows into one seamless experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
                <Icon
                  className="text-[var(--primary)]"
                  size={28}
                />
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-[var(--text-muted)]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}