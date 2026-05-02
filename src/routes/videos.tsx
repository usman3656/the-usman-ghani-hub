import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { VIDEOS, type Video } from "@/content/data";
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

const CATEGORY_LABEL: Record<Video["category"], string> = {
  blockchain: "Blockchain",
  "ai-ml": "AI/ML",
  engineering: "Engineering",
};

function VideosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | Video["category"]>("all");
  const categories = useMemo(
    () => Array.from(new Set(VIDEOS.map((v) => v.category))),
    [],
  );
  const filtered = VIDEOS.filter((v) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q);
    const matchesCategory = category === "all" || v.category === category;
    return matchesSearch && matchesCategory;
  });

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
        <div className="mb-8 space-y-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
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
                {CATEGORY_LABEL[item]}
              </button>
            ))}
          </div>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2">
          {filtered.map((v) => (
            <li key={v.youtubeId}>
              <YouTubeEmbed id={v.youtubeId} title={v.title} />
              <h2 className="mt-4 font-serif text-2xl font-bold leading-snug text-foreground">
                {v.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{formatDate(v.date)}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {CATEGORY_LABEL[v.category]}
              </p>
              <p className="mt-2 font-serif text-base leading-relaxed text-foreground/90">
                {v.description}
              </p>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No videos match your search/filter yet.</p>
        )}
      </section>
    </SiteLayout>
  );
}
