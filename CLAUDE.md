# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Itaru OTA, built with Next.js 14 (App Router) and Material UI. Deployed as a static site to GitHub Pages.

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
```

### Theming
- `src/contexts/ThemeContext.tsx` - Dark/light mode toggle with system preference detection
- `src/theme/theme.ts` - MUI theme customization
- Uses Inconsolata font globally

### Static Export
Configured for GitHub Pages deployment (`output: 'export'` in next.config.mjs). GitHub Actions workflow builds and deploys on push to main.
