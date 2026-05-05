import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { formatDate, getPostMetas } from "@/content/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Usman Ghani Bawany" },
      {
        name: "description",
        content:
          "Essays on machine learning, cryptography, markets, and the philosophy of mind by Usman Ghani Bawany.",
      },
      { property: "og:title", content: "Blog — Usman Ghani Bawany" },
      {
        property: "og:description",
        content: "Essays on machine learning, cryptography, markets, and the philosophy of mind.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const posts = getPostMetas();
  const normalizeCategory = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-");
  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags.map((t) => normalizeCategory(t))))),
    [posts],
  );
  const filtered = posts.filter((p) => {
    const q = search.trim().toLowerCase();
    const haystack = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    const matchesCategory =
      category === "all" || p.tags.map((t) => normalizeCategory(t)).includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-4 font-serif text-lg text-muted-foreground">
          Notes from research, reading, and the occasional 2am thought.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <hr className="border-border" />
      </div>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="relative z-10 mb-8 space-y-3 pointer-events-auto">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                category === "all"
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                  category === item
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <ul className="space-y-12">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <p className="text-sm text-muted-foreground">
                  {formatDate(p.date)} · {p.readingTime} min read
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                {p.tags.length > 0 && (
                  <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                    {p.tags.join(" · ")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No blog posts match your search/filter yet.</p>
        )}
      </section>
    </SiteLayout>
  );
}
