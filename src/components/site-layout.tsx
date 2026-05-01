import { Link } from "@tanstack/react-router";
import { SITE } from "@/content/data";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/blog", label: "Blog" },
  { to: "/books", label: "Books" },
  { to: "/videos", label: "Videos" },
  { to: "/cv", label: "CV" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background no-print">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link
          to="/"
          className="font-serif text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {SITE.shortName}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={item.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground font-medium" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background no-print">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Written in London.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={SITE.links.email}
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
