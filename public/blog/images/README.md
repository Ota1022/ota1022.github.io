# Blog Images Directory

Place images for blog posts in this directory.

## Usage

### Placing Images

1. Place image files in this directory (`public/blog/images/`)
2. Reference them in Markdown files as follows:

```md
![Image description](/blog/images/your-image.webp)
```

### Example

Article file: `content/blog/my-post.md`

```md
---
title: "My Post"
description: "A short summary of the post."
date: "2024-12-11"
category: "blog"
---

## Introduction

Here's an image:

![Example Image](/blog/images/example.webp)
```

Image file: `public/blog/images/example.webp`

### Recommendations

- Use lowercase letters and hyphens for file names (e.g., `my-image.webp`)
- Prefer WebP for photographs and diagrams; keep SVG for vector artwork
- Resize images to the largest size used by the site before committing them
