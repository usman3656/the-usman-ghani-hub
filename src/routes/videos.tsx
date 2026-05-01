import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { VIDEOS } from "@/content/data";
import { formatDate } from "@/content/posts";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Usman Ghani Bawany" },
      {
        name: "description",
        content: "Talks, walkthroughs, and explainers on cryptography, ML, and engineering.",
      },
      { property: "og:title", content: "Videos — Usman Ghani Bawany" },
      {
        property: "og:description",
        content: "Talks and walkthroughs on cryptography, machine learning, and engineering.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Videos
        </h1>
        <p className="mt-4 font-serif text-lg text-muted-foreground">
          Talks, explainers, and the occasional behind-the-scenes from projects I'm building.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <hr className="border-border" />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <ul className="grid gap-10 sm:grid-cols-2">
          {VIDEOS.map((v) => (
            <li key={v.youtubeId}>
              <YouTubeEmbed id={v.youtubeId} title={v.title} />
              <h2 className="mt-4 font-serif text-2xl font-bold leading-snug text-foreground">
                {v.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{formatDate(v.date)}</p>
              <p className="mt-2 font-serif text-base leading-relaxed text-foreground/90">
                {v.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
