import { useEffect, useState } from "react";

const MAX_CLAPS = 50;

function readClaps(slug: string): number {
  if (typeof window === "undefined") return 0;
  const v = window.localStorage.getItem(`claps:${slug}`);
  return v ? Math.min(MAX_CLAPS, parseInt(v, 10) || 0) : 0;
}

export function ClapButton({ slug }: { slug: string }) {
  const [claps, setClaps] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setClaps(readClaps(slug));
    setMounted(true);
  }, [slug]);

  function handleClap() {
    setClaps((c) => {
      const next = Math.min(MAX_CLAPS, c + 1);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(`claps:${slug}`, String(next));
      }
      return next;
    });
    setPulse((p) => p + 1);
  }

  const reachedMax = claps >= MAX_CLAPS;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClap}
        disabled={reachedMax}
        aria-label={`Clap for this post (${claps} of ${MAX_CLAPS})`}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background transition-all hover:border-primary hover:shadow-md ${
          reachedMax ? "opacity-60 cursor-not-allowed" : "active:scale-95"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-6 w-6 transition-colors ${
            claps > 0 ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          }`}
        >
          <path d="M11 14h-1.5l-2-2 2-2 2 2v3" />
          <path d="M14 11.5V6a1.5 1.5 0 1 0-3 0v5" />
          <path d="M11 8V4a1.5 1.5 0 1 0-3 0v6" />
          <path d="M8 8.5V6a1.5 1.5 0 1 0-3 0v6.5a8 8 0 0 0 8 8 6 6 0 0 0 6-6V9a1.5 1.5 0 1 0-3 0v3" />
        </svg>
        {pulse > 0 && (
          <span
            key={pulse}
            className="pointer-events-none absolute inset-0 rounded-full border border-primary animate-ping"
          />
        )}
      </button>
      <span className="font-sans text-xs tabular-nums text-muted-foreground">
        {mounted ? claps : 0}
      </span>
    </div>
  );
}
