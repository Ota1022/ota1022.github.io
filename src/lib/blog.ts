import type { BlogPost, BlogPostFrontmatter, BlogPostMetadata } from '@/types/blog';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data as BlogPostFrontmatter,
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

  return {
    slug,
    frontmatter: data as BlogPostFrontmatter,
    content,
  };
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
      return !data.externalUrl;
    })
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
