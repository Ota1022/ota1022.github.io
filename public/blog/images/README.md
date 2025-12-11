# Blog Images Directory

Place images for blog posts in this directory.

## Usage

### Placing Images

1. Place image files in this directory (`public/blog/images/`)
2. Reference them in MDX files as follows:

```mdx
![Image description](/blog/images/your-image.jpg)
```

Or use HTML img tag:

```mdx
<img src="/blog/images/your-image.jpg" alt="Image description" />
```

### Example

Article file: `content/blog/my-post.mdx`

```mdx
---
title: "My Post"
date: "2024-12-11"
category: "tech"
---

## Introduction

Here's an image:

![Example Image](/blog/images/example.png)
```

Image file: `public/blog/images/example.png`

### Recommendations

- Use lowercase letters and hyphens for file names (e.g., `my-image.jpg`)
- Optimize image sizes appropriately
- File formats: JPG, PNG, WebP, etc.
