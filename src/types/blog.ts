import type { BlogPostFrontmatter } from '@/lib/blog-schema';

export type { BlogCategory, BlogPostFrontmatter } from '@/lib/blog-schema';

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTimeMinutes: number;
}

export interface BlogPostMetadata {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  readingTimeMinutes?: number;
}
