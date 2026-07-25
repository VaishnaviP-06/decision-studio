import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-[var(--text-muted)] md:flex-row">
        <p>© 2026 Decision Studio</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/" className="transition hover:text-[var(--text)]">
            Home
          </Link>
          <Link
            to="/#features"
            className="transition hover:text-[var(--text)]"
          >
            Features
          </Link>
          <Link
            to="/#preview"
            className="transition hover:text-[var(--text)]"
          >
            Preview
          </Link>
          <Link
            to="/studio"
            className="transition hover:text-[var(--text)]"
          >
            Workspace
          </Link>
        </nav>
      </div>
    </footer>
  );
}