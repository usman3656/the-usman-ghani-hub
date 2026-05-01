import matter from "gray-matter";

const rawPosts = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  readingTime: number;
  wordCount: number;
};

export type Post = PostMeta & { content: string };

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function readingTime(text: string): { minutes: number; words: number } {
  const words = text.trim().split(/\s+/).length;
  return { minutes: Math.max(1, Math.round(words / 220)), words };
}

const allPosts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    const { minutes, words } = readingTime(content);
    return {
      slug: slugFromPath(path),
      title: String(data.title ?? "Untitled"),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      readingTime: minutes,
      wordCount: words,
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return allPosts;
}

export function getPostMetas(): PostMeta[] {
  return allPosts.map(({ content: _c, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
