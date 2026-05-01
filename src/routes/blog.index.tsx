import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/content/../components/site-layout";
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
  const posts = getPostMetas();
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
        <ul className="space-y-12">
          {posts.map((p) => (
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
      </section>
    </SiteLayout>
  );
}
