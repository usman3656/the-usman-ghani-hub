import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { MarkdownArticle } from "@/components/markdown-article";
import { ClapButton } from "@/components/clap-button";
import { formatDate, getPostBySlug } from "@/content/posts";
import { SITE } from "@/content/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} — ${SITE.shortName}` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: loaderData.date },
        { property: "article:author", content: SITE.name },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl font-bold">Post not found</h1>
        <p className="mt-3 text-muted-foreground">
          That essay may have moved or never existed.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-block text-primary underline underline-offset-4"
        >
          ← Back to blog
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 text-primary underline underline-offset-4">
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-12">
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{SITE.shortName}</span>
            <span> · {formatDate(post.date)} · {post.readingTime} min read</span>
          </p>
          {post.tags.length > 0 && (
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              {post.tags.join(" · ")}
            </p>
          )}
        </header>

        <MarkdownArticle>{post.content}</MarkdownArticle>

        <footer className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-10">
          <p className="font-serif text-sm text-muted-foreground">
            Enjoyed this? Clap to let me know.
          </p>
          <ClapButton slug={post.slug} />
          <Link
            to="/blog"
            className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </SiteLayout>
  );
}
