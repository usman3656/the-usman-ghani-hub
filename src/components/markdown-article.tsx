import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export function MarkdownArticle({ children }: { children: string }) {
  return (
    <article className="prose-article">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </article>
  );
}
