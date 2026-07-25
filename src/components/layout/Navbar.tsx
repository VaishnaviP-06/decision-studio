import { ArrowRight, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <BrainCircuit
            size={26}
            className="text-[var(--primary)]"
          />

          <span>Decision Studio</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Features
          </a>

          <a
            href="#preview"
            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Preview
          </a>

          <Link
            to="/studio"
            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Workspace
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/studio"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Launch Studio
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;