# Blog authoring

Blog posts live in `content/blog/` as `.md` files. They use GitHub Flavored
Markdown plus four site-specific embed directives. The directives are not
portable standard Markdown; the site validates and renders them during the
static build.

## Frontmatter

Every post starts with YAML frontmatter:

```yaml
---
title: "Post title"
description: "Short summary"
date: "2026-09-13"
category: "blog"
emoji: "📝"
tags: ["AWS", "OpenTelemetry"]
ogImage: "/blog/images/example/og.jpg"
---
```

`title`, `description`, `date`, and `category` are required. `category` must be
one of `blog`, `zenn`, `speakerdeck`, `announcement`, `activity`, or `other`.
`emoji`, `tags`, and `ogImage` are optional. Set `externalUrl` for an entry that
should link directly to another site and should not generate its own post page.

## Embeds

Each embed occupies its own line. The title in square brackets becomes the
accessible iframe name for videos and slides.

```md
::youtube[Recording title]{id="JQPfFtRd45A"}

::speakerdeck[Slide title]{id="e0d81e214d584ead8ab959c1dea62a43"}

::github{url="https://github.com/openai/openai-node" description="Optional repository description."}

::article[Article title]{url="https://example.com/post" source="Publisher" description="Required article description."}
```

The accepted values are:

| Directive | Required | Optional |
| --- | --- | --- |
| `youtube` | title, 11-character `id` | none |
| `speakerdeck` | title, 32-character hexadecimal `id` | none |
| `github` | HTTPS GitHub repository `url` | `description` |
| `article` | title, HTTP(S) `url`, `source`, `description` | none |

Unknown directives and attributes fail the build. Raw HTML, JSX, JavaScript
expressions, and imports or exports are not supported in article content.
Directive-like text inside a fenced or inline code span remains code.

Keep each directive and its attributes on one physical line. Attribute values
use double quotes. Encode a literal `&` as `&amp;` and a literal double quote as
`&quot;`; the parser restores the original value before rendering. In a title,
escape literal square brackets as `\[` and `\]`. Replace line breaks inside a
title or attribute with spaces. Inside link text or image alt text, escape a
colon followed by letters or digits as `\:` so `remark-directive` preserves it
as ordinary punctuation.

For example, this input fails with a filename and line number because the
YouTube ID is invalid:

```text
content/blog/example.md:12:1: youtube id must contain exactly 11 URL-safe characters
```

## Preview and validation

Run the full automated checks before previewing:

```bash
npm run check
npm run build
```

`npm run check` validates formatting, TypeScript, the four directives, invalid
input handling, heading extraction, and all blog files. `npm run build`
generates the OG images and static HTML in `out/`.

For an interactive preview, run:

```bash
npm run dev
```

Check the post at `/blog/<filename-without-.md>`. Verify desktop and mobile
widths, both color modes, heading links, wide tables, image dimensions, embeds,
and code-copy behavior.
