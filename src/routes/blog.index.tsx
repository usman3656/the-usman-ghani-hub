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

function normalizeCategory(value: string) {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

function BlogIndex() {
  const [search, setSearch] = useState("");
  const posts = getPostMetas();

  const categories = useMemo(() => {
    const byValue = new Map<string, string>();
    for (const tag of posts.flatMap((p) => p.tags)) {
      const value = normalizeCategory(tag);
      if (!byValue.has(value)) {
        byValue.set(value, tag);
      }
    }
    return Array.from(byValue.entries()).map(([value, label]) => ({ value, label }));
  }, [posts]);

  /** Plain CSS visibility rules — works without relying on React click handlers (hydration / overlays). */
  const categoryFilterCss = useMemo(() => {
    const pillActive = (radioId: string, labelFor: string) =>
      `body:has(#${radioId}:checked) label.blog-cat-pill[for="${labelFor}"] { border-color: var(--primary) !important; color: var(--primary) !important; }`;

    const rules: string[] = [
      `#blog-cat-all:checked ~ ul.blog-post-list > li { display: block !important; }`,
      pillActive("blog-cat-all", "blog-cat-all"),
    ];
    for (const { value } of categories) {
      const id = `blog-cat-${value}`;
      rules.push(`#${id}:checked ~ ul.blog-post-list > li { display: none !important; }`);
      rules.push(`#${id}:checked ~ ul.blog-post-list > li[data-tags~="${value}"] { display: block !important; }`);
      rules.push(pillActive(id, id));
    }
    return rules.join("\n");
  }, [categories]);

  const postsMatchingSearch = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, search]);

  const pillBase =
    "rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors cursor-pointer touch-manipulation select-none relative z-[101]";

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
        <div className="relative isolate z-[100] mb-8 space-y-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="relative z-[101] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
          />

          {/* Category radios + CSS filtering (no React state needed for categories) */}
          <div className="relative isolate z-[100] space-y-3">
            <style dangerouslySetInnerHTML={{ __html: categoryFilterCss }} />

            <input
              type="radio"
              name="blog-category-filter"
              id="blog-cat-all"
              defaultChecked
              className="sr-only"
            />
            {categories.map((item) => (
              <input
                key={item.value}
                type="radio"
                name="blog-category-filter"
                id={`blog-cat-${item.value}`}
                className="sr-only"
              />
            ))}

            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              <label
                htmlFor="blog-cat-all"
                className={`blog-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
              >
                All
              </label>
              {categories.map((item) => (
                <label
                  key={item.value}
                  htmlFor={`blog-cat-${item.value}`}
                  className={`blog-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
                >
                  {item.label}
                </label>
              ))}
            </div>

            <ul className="blog-post-list space-y-12">
              {postsMatchingSearch.map((p) => (
                <li
                  key={p.slug}
                  data-tags={p.tags.map((t) => normalizeCategory(t)).join(" ")}
                  className="blog-post-item block"
                >
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
          </div>
        </div>

        {postsMatchingSearch.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No blog posts match your search/filter yet.
          </p>
        )}
      </section>
    </SiteLayout>
  );
}
