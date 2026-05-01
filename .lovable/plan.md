
# Usman's Personal Publication — Plan

A Medium-inspired personal site for Usman Ghani Bawany (UCL MSc, ML/blockchain researcher, founder of Foresio & Uplift Pakistan). Clean serif typography, white background, content-first.

## Pages & Routes

```text
/              Home — author intro + latest posts/books/videos
/blog          All blog posts (list with excerpts, reading time, date)
/blog/$slug    Individual post (long-form reading view)
/books         Reading list with cover, rating, notes
/videos        Grid of embedded YouTube videos
/cv            Full CV rendered from resume content + PDF download
/about         (optional) longer bio — included in nav
```

## Design System

- **Aesthetic**: Medium-classic. Pure white background, near-black text (#1a1a1a), thin gray dividers.
- **Typography**:
  - Headings & body prose: serif (Source Serif 4 or Charter-style stack)
  - UI/nav/meta: sans-serif (Inter)
  - Generous line-height (1.7) and max prose width (~680px) for posts
- **Accent**: a single subtle accent (deep green or muted indigo) for links and the clap button
- **Header**: minimal — name on left, nav links on right (Home · Blog · Books · Videos · CV), thin bottom border
- **Footer**: small links to LinkedIn, GitHub, email

## Home Page

- Hero: large serif name, one-line tagline ("Researcher at UCL · Building Foresio · Writing on AI, blockchain, and the philosophy of mind"), short bio paragraph
- Social/contact row (LinkedIn, GitHub, email)
- "Latest writing" — 3 most recent posts with title, excerpt, date, reading time
- "Currently reading" — 3 books from the list
- "Recent talks" — 2-3 video thumbnails
- Each section ends with a "View all →" link

## Blog

- **Source**: Markdown (.md) files in `src/content/posts/` with frontmatter (title, date, excerpt, tags, readingTime). Loaded via Vite's `import.meta.glob`. Rendered with `react-markdown` + `remark-gfm` + syntax highlighting.
- **List page**: title, 2-line excerpt, date · reading time · tags. Hover underline only.
- **Post page**: centered serif column, large title, author/date/reading-time meta, prose styling, code blocks, blockquotes. Sticky claps button on the side (desktop) / bottom (mobile).
- 3-4 seeded sample posts based on Usman's research interests (zk wallets, AI reflexivity in equities, explainable AI in healthcare, evolutionary biology musings).

## Books

- Grid of cards: cover image, title, author, star rating (1-5), short note/review, "currently reading | finished | want to read" status badge.
- Source: markdown or a single `books.ts` data file (markdown-files approach).
- 6-8 seeded entries reflecting Usman's interests (philosophy of mind, evolutionary biology, theology, technical books).

## Videos

- Responsive grid of YouTube embeds (lazy-loaded thumbnails that swap to iframe on click for performance).
- Each card: title, short description, date.
- Source: markdown/data file. Seeded with placeholder entries the user can replace.

## CV

- Full resume rendered as a clean, printable web page using the parsed resume content (Education, Research, Projects, Work Experience, Achievements, Leadership, Skills, Interests).
- "Download PDF" button linking to the uploaded `Resume_Usman.pdf` placed in `/public`.
- Print-friendly CSS so Cmd+P produces a clean copy.

## Claps (Anonymous Engagement)

- Medium-style clap button on each blog post.
- Stored in `localStorage` keyed by post slug — no backend, no auth. Each visitor can clap up to 50 times per post (Medium convention). Counts are local-only initially.
- Note: this is anonymous and per-device. If you later want a global clap counter shared across visitors, that's a follow-up that adds Lovable Cloud.

## Content Workflow

- To add a post: drop `my-post.md` in `src/content/posts/` with frontmatter — it appears automatically.
- To add a book or video: edit the corresponding markdown/data file.
- No admin UI, no database — fully version-controlled.

## Technical Notes

- TanStack Start file-based routing; each section gets its own route file with proper `head()` metadata (title, description, og tags) for SEO and social sharing.
- Markdown loaded via `import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true })`, parsed at build time; frontmatter via `gray-matter`.
- Reading time computed from word count.
- `react-markdown` + `remark-gfm` + `rehype-highlight` for prose rendering.
- All images optimized; YouTube embeds use `lite-youtube` pattern (thumbnail + click-to-load) for fast page loads.
- Resume PDF copied to `/public/Resume_Usman.pdf`.

## Out of Scope (can add later)

- Comments, login, global shared clap counts (would need Lovable Cloud)
- Admin dashboard for editing in-browser
- Newsletter signup / RSS feed (easy follow-ups)
- Tag filter pages
