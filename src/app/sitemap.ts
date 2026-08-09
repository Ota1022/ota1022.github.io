import { getAllPosts } from '@/lib/blog';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://ota1022.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
    .filter((post) => !post.frontmatter.externalUrl)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts,
  ];
}
