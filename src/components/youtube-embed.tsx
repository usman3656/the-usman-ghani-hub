import { useState } from "react";

export function YouTubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-md bg-muted"
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/95 shadow-lg transition-transform group-hover:scale-110">
          <svg
            className="ml-1 h-7 w-7 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
