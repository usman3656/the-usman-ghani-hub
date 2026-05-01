import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getPostMetas } from "@/content/posts";
import { BOOKS, SITE, VIDEOS } from "@/content/data";
import { formatDate } from "@/content/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Writing on AI, blockchain & ideas` },
      {
        name: "description",
        content:
          "Personal site of Usman Ghani Bawany — UCL researcher and founder writing about machine learning, cryptography, markets, and the philosophy of mind.",
      },
      { property: "og:title", content: `${SITE.name}` },
      {
        property: "og:description",
        content: SITE.tagline,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const posts = getPostMetas().slice(0, 3);
  const reading = BOOKS.filter((b) => b.status === "reading").slice(0, 3);
  const videos = VIDEOS.slice(0, 2);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
          {SITE.name}
        </h1>
        <p className="mt-6 font-serif text-xl leading-relaxed text-muted-foreground">
          {SITE.tagline}
        </p>
        <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/90">
          {SITE.bio}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={SITE.links.email}
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            {SITE.email}
          </a>
          <span className="text-muted-foreground">· {SITE.location}</span>
        </div>
      </section>

      <Divider />

      {/* Latest writing */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading title="Latest writing" linkTo="/blog" linkLabel="All posts" />
        <ul className="mt-8 space-y-10">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 font-serif text-lg leading-relaxed text-muted-foreground line-clamp-3">
                  {p.excerpt}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {formatDate(p.date)} · {p.readingTime} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* Currently reading */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading title="Currently reading" linkTo="/books" linkLabel="Reading list" />
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {reading.map((b) => (
            <li key={b.title}>
              <p className="font-serif text-lg font-semibold leading-snug text-foreground">
                {b.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
              <p className="mt-3 font-serif text-base leading-relaxed text-foreground/80 line-clamp-4">
                {b.notes}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* Recent talks */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading title="Recent talks" linkTo="/videos" linkLabel="All videos" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {videos.map((v) => (
            <div key={v.youtubeId}>
              <YouTubeEmbed id={v.youtubeId} title={v.title} />
              <p className="mt-3 font-serif text-lg font-semibold leading-snug text-foreground">
                {v.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <hr className="border-border" />
    </div>
  );
}

function SectionHeading({
  title,
  linkTo,
  linkLabel,
}: {
  title: string;
  linkTo: "/blog" | "/books" | "/videos";
  linkLabel: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      <Link
        to={linkTo}
        className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
