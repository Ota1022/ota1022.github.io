import { parseBlogFrontmatter } from '@/lib/blog-schema';
import { calculateReadingTime } from '@/lib/markdown';
import type { BlogPost, BlogPostMetadata } from '@/types/blog';
import fs from 'node:fs';
import matter from 'gray-matter';
import path from 'node:path';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Get metadata for all posts (for listing)
 */
export function getAllPosts(): BlogPostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = parseBlogFrontmatter(data, fileName);

      return {
        slug,
        frontmatter,
        readingTimeMinutes: frontmatter.externalUrl
          ? undefined
          : calculateReadingTime(content),
      };
    });

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = parseBlogFrontmatter(data, `${slug}.mdx`);

  return {
    slug,
    frontmatter,
    content,
    readingTimeMinutes: calculateReadingTime(content),
  };
}

/**
 * Find entries with shared tags or a shared category, falling back to recency.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPostMetadata[] {
  const posts = getAllPosts();
  const currentPost = posts.find((post) => post.slug === slug);
  if (!currentPost) {
    return [];
  }

  const currentTags = new Set(currentPost.frontmatter.tags ?? []);

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = (post.frontmatter.tags ?? []).filter((tag) =>
        currentTags.has(tag)
      ).length;
      const sameCategory =
        post.frontmatter.category === currentPost.frontmatter.category ? 1 : 0;
      return { post, score: sharedTags * 2 + sameCategory };
    })
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Get all post slugs (for generateStaticParams)
 * Excludes posts with externalUrl since they don't need individual pages
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .filter((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const frontmatter = parseBlogFrontmatter(data, fileName);
      return !frontmatter.externalUrl;
    })
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
