# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Itaru OTA, built with Next.js 16 (App Router) and Material UI. Deployed as a static site to GitHub Pages.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build with static export to ./out
npm run lint         # ESLint
npm run lint:biome   # Biome linter (preferred)
npm run format:biome # Biome formatter
```

## Architecture

### App Structure (`src/app/`)
- `page.tsx` - Main portfolio page that composes all portfolio sections
- `layout.tsx` - Root layout with MUI ThemeProvider and dark/light mode context
- `blog/` - Blog listing and individual post pages (`[slug]/page.tsx`)
- `components/` - Portfolio section pages (Experience, Education, Awards, etc.) - these are imported as components into the main page

### Components (`src/components/`)
- `AboutMe.tsx`, `Contact.tsx` - Standalone portfolio section components
- `layout/Header.tsx` - Navigation header with theme toggle and blog link
- `blog/` - Blog-related components (BlogList, BlogCard, MDXComponents, CodeBlock)
- `icons/` - Custom SVG icon components (Zenn, SpeakerDeck, Credly)

### Content (`content/blog/`)
MDX blog posts with frontmatter. Posts can be internal or link to external sources (Zenn, SpeakerDeck).

Frontmatter schema:
```yaml
title: string
description: string
date: string (YYYY-MM-DD)
category: 'blog' | 'zenn' | 'speakerdeck' | 'announcement' | 'activity' | 'other'
tags?: string[]
externalUrl?: string  # If set, links to external site instead of rendering content
ogImage?: string      # Optional absolute site path for the article's social preview image
```

### Theming
- `src/contexts/ThemeContext.tsx` - Dark/light mode toggle with system preference detection
- `src/theme/theme.ts` - MUI theme customization
- Uses Inconsolata font globally

### Static Export
Configured for GitHub Pages deployment (`output: 'export'` in next.config.mjs). GitHub Actions workflow builds and deploys on push to main.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
