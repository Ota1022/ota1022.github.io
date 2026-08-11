import BlogList from '@/components/blog/BlogList';
import PageShell from '@/components/layout/PageShell';
import { getAllPosts } from '@/lib/blog';
import { Box } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles, talks, and professional updates in English by Itaru OTA.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Itaru OTA',
    description:
      'Technical articles, talks, and professional updates in English by Itaru OTA.',
    url: '/blog',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <PageShell>
      <Box component="main" sx={{ my: 4 }}>
        <BlogList initialPosts={allPosts} />
      </Box>
    </PageShell>
  );
}
