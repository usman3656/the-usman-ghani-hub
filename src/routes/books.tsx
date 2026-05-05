import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { BOOKS, type Book } from "@/content/data";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Usman Ghani Bawany" },
      {
        name: "description",
        content:
          "What I'm reading and what stuck with me — philosophy, evolutionary biology, theology, and the occasional textbook.",
      },
      { property: "og:title", content: "Books — Usman Ghani Bawany" },
      {
        property: "og:description",
        content: "Reading list with notes — philosophy, evolutionary biology, theology, and more.",
      },
    ],
  }),
  component: BooksPage,
});

const STATUS_LABEL: Record<Book["status"], string> = {
  reading: "Currently reading",
  finished: "Finished",
  "want-to-read": "Want to read",
};

const CATEGORY_LABEL: Record<Book["category"], string> = {
  philosophy: "Philosophy",
  "ai-ml": "AI/ML",
  science: "Science",
  poetry: "Poetry",
  finance: "Finance",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-primary tracking-wider" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-border">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function BooksPage() {
  const [search, setSearch] = useState("");
  const ordered = useMemo(
    () => [
      ...BOOKS.filter((b) => b.status === "reading"),
      ...BOOKS.filter((b) => b.status === "finished"),
      ...BOOKS.filter((b) => b.status === "want-to-read"),
    ],
    [],
  );

  const categories = useMemo(
    () => Array.from(new Set(BOOKS.map((b) => b.category))),
    [],
  );

  /** Plain CSS visibility — same approach as blog (works without React handling category clicks). */
  const categoryFilterCss = useMemo(() => {
    const pillActive = (radioId: string, labelFor: string) =>
      `body:has(#${radioId}:checked) label.books-cat-pill[for="${labelFor}"] { border-color: var(--primary) !important; color: var(--primary) !important; }`;

    const rules: string[] = [
      `#books-cat-all:checked ~ ul.books-post-list > li { display: block !important; }`,
      pillActive("books-cat-all", "books-cat-all"),
    ];
    for (const cat of categories) {
      const id = `books-cat-${cat}`;
      rules.push(`#${id}:checked ~ ul.books-post-list > li { display: none !important; }`);
      rules.push(`#${id}:checked ~ ul.books-post-list > li[data-category="${cat}"] { display: block !important; }`);
      rules.push(pillActive(id, id));
    }
    return rules.join("\n");
  }, [categories]);

  const booksMatchingSearch = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.notes.toLowerCase().includes(q),
    );
  }, [ordered, search]);

  const pillBase =
    "rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors cursor-pointer touch-manipulation select-none relative z-[101]";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Books
        </h1>
        <p className="mt-4 font-serif text-lg text-muted-foreground">
          A live shelf. What I'm reading, what I've finished, and what's queued up next.
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
            placeholder="Search books..."
            className="relative z-[101] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
          />

          <div className="relative isolate z-[100] space-y-3">
            <style dangerouslySetInnerHTML={{ __html: categoryFilterCss }} />

            <input
              type="radio"
              name="books-category-filter"
              id="books-cat-all"
              defaultChecked
              className="sr-only"
            />
            {categories.map((cat) => (
              <input
                key={cat}
                type="radio"
                name="books-category-filter"
                id={`books-cat-${cat}`}
                className="sr-only"
              />
            ))}

            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              <label
                htmlFor="books-cat-all"
                className={`books-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
              >
                All
              </label>
              {categories.map((cat) => (
                <label
                  key={cat}
                  htmlFor={`books-cat-${cat}`}
                  className={`books-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
                >
                  {CATEGORY_LABEL[cat]}
                </label>
              ))}
            </div>

            <ul className="books-post-list space-y-10">
              {booksMatchingSearch.map((b) => (
                <li
                  key={b.title}
                  data-category={b.category}
                  className="books-post-item grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <div className="text-xs uppercase tracking-wider text-muted-foreground sm:w-32 sm:pt-2">
                    {STATUS_LABEL[b.status]}
                  </div>
                  <div className="flex gap-4">
                    <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted/40">
                      {b.cover ? (
                        <img src={b.cover} alt={`${b.title} cover`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {b.title
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold leading-snug text-foreground">{b.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {b.author} · <Stars rating={b.rating} />
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {CATEGORY_LABEL[b.category]}
                      </p>
                      <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/90">{b.notes}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {booksMatchingSearch.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No books match your search/filter yet.</p>
        )}
      </section>
    </SiteLayout>
  );
}
