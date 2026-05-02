import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/content/data";

const NAV: Array<{ to: "/" | "/blog" | "/books" | "/videos" | "/cv"; label: string; exact?: boolean }> = [
  { to: "/", label: "Home", exact: true },
  { to: "/blog", label: "Blog" },
  { to: "/books", label: "Books" },
  { to: "/videos", label: "Videos" },
  { to: "/cv", label: "CV" },
];

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y < 24) {
        setIsVisible(true);
      } else if (y < lastY) {
        setIsVisible(true);
      } else if (y > lastY) {
        setIsVisible(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm no-print transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-end gap-6 px-6 py-5">
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
      <main className="flex-1 pt-[77px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
