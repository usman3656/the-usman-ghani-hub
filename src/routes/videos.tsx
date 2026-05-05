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
  const categories = useMemo(
    () => Array.from(new Set(VIDEOS.map((v) => v.category))),
    [],
  );

  /** Plain CSS visibility — same as blog / books (native radios + labels, no React for category). */
  const categoryFilterCss = useMemo(() => {
    const pillActive = (radioId: string, labelFor: string) =>
      `body:has(#${radioId}:checked) label.videos-cat-pill[for="${labelFor}"] { border-color: var(--primary) !important; color: var(--primary) !important; }`;

    const rules: string[] = [
      `#videos-cat-all:checked ~ ul.videos-post-list > li { display: block !important; }`,
      pillActive("videos-cat-all", "videos-cat-all"),
    ];
    for (const cat of categories) {
      const id = `videos-cat-${cat}`;
      rules.push(`#${id}:checked ~ ul.videos-post-list > li { display: none !important; }`);
      rules.push(`#${id}:checked ~ ul.videos-post-list > li[data-category="${cat}"] { display: block !important; }`);
      rules.push(pillActive(id, id));
    }
    return rules.join("\n");
  }, [categories]);

  const videosMatchingSearch = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return VIDEOS;
    return VIDEOS.filter(
      (v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q),
    );
  }, [search]);

  const pillBase =
    "rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors cursor-pointer touch-manipulation select-none relative z-[101]";

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
        <div className="relative isolate z-[100] mb-8 space-y-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="relative z-[101] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
          />

          <div className="relative isolate z-[100] space-y-3">
            <style dangerouslySetInnerHTML={{ __html: categoryFilterCss }} />

            <input
              type="radio"
              name="videos-category-filter"
              id="videos-cat-all"
              defaultChecked
              className="sr-only"
            />
            {categories.map((cat) => (
              <input
                key={cat}
                type="radio"
                name="videos-category-filter"
                id={`videos-cat-${cat}`}
                className="sr-only"
              />
            ))}

            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              <label
                htmlFor="videos-cat-all"
                className={`videos-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
              >
                All
              </label>
              {categories.map((cat) => (
                <label
                  key={cat}
                  htmlFor={`videos-cat-${cat}`}
                  className={`videos-cat-pill ${pillBase} border-border text-muted-foreground hover:text-foreground`}
                >
                  {CATEGORY_LABEL[cat]}
                </label>
              ))}
            </div>

            <ul className="videos-post-list grid gap-10 sm:grid-cols-2">
              {videosMatchingSearch.map((v) => (
                <li key={v.youtubeId} data-category={v.category} className="videos-post-item block">
                  <YouTubeEmbed id={v.youtubeId} title={v.title} />
                  <h2 className="mt-4 font-serif text-2xl font-bold leading-snug text-foreground">{v.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(v.date)}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {CATEGORY_LABEL[v.category]}
                  </p>
                  <p className="mt-2 font-serif text-base leading-relaxed text-foreground/90">{v.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {videosMatchingSearch.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No videos match your search/filter yet.</p>
        )}
      </section>
    </SiteLayout>
  );
}
