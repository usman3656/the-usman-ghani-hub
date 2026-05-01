import { createFileRoute } from "@tanstack/react-router";
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

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-primary tracking-wider" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-border">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function BooksPage() {
  const ordered = [
    ...BOOKS.filter((b) => b.status === "reading"),
    ...BOOKS.filter((b) => b.status === "finished"),
    ...BOOKS.filter((b) => b.status === "want-to-read"),
  ];

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
        <ul className="space-y-10">
          {ordered.map((b) => (
            <li key={b.title} className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground sm:w-32 sm:pt-2">
                {STATUS_LABEL[b.status]}
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold leading-snug text-foreground">
                  {b.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {b.author} · <Stars rating={b.rating} />
                </p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/90">
                  {b.notes}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
