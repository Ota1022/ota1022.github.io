import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog posts by Itaru OTA',
  openGraph: {
    title: 'Blog | Itaru OTA',
    description: 'Blog posts by Itaru OTA',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return <BlogList initialPosts={allPosts} />;
}
