# Markdown Migration Verification

## Before the migration

On September 13, 2026, both `npm run check` and `npm run build` completed successfully against the pre-migration state. The static export generated HTML for 13 posts and 14 OG images, including the default image. The pre-migration `out/` directory was retained temporarily for comparison.

The comparison recorded the slug, frontmatter, body, and public URL of all 13 posts. None of the posts used `externalUrl`. The content contained 13 YouTube embeds, eight Speaker Deck embeds, four GitHub repository cards, and one external article card.

Before implementation, the repository-local Next.js 16 documentation for Server Components and static exports was reviewed. Markdown parsing and React conversion run in a Server Component so the parsing libraries are not included in the browser bundle.

## After the migration

The following output was compared before and after the migration:

- All 13 slugs and frontmatter blocks
- Canonical URLs, Open Graph metadata, Twitter metadata, and JSON-LD
- Article body and code-block text
- Heading IDs, links, and image source, alternative text, dimensions, and lazy-loading attributes
- Iframe source, title, allowlist, and lazy-loading attributes
- GitHub repository card and external article card values
- The exported page list and OG images

Metadata, body text, code, links, images, embed attributes, and heading IDs match the pre-migration output. Because the table of contents now comes from the syntax tree, the table of contents for `20260131_aws-how-to-use-terraformer` displays literal `*` and `_` characters from its headings. The previous regular expression removed those characters without distinguishing Markdown formatting from literal text. Anchor IDs remain unchanged.

Reading time continues to use 200 words per minute with a one-minute minimum. Excluding code from the word count changed only these posts:

| Slug | Before | After |
| --- | ---: | ---: |
| `20260131_aws-how-to-use-terraformer` | 13 min | 12 min |
| `20260813_kubecon-cloudnativecon-japan-2026` | 18 min | 17 min |
| `20260904_rust-opentelemetry-ecs-xray` | 15 min | 14 min |

## Visual verification

The development server was checked at desktop and 390 px mobile widths in light and dark modes. The checks covered the table of contents, images, Speaker Deck, multiple YouTube videos, GitHub repository cards, external article cards, and code copying. Wide tables scroll within their container without causing page-level horizontal overflow. Direct navigation to an existing post returns HTTP 200, while a missing post returns HTTP 404.

The final `npm run check`, `npm run build`, and `git diff --check` commands completed successfully.
