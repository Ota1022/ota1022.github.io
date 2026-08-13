import BlogList from '@/components/blog/BlogList';
import PageShell from '@/components/layout/PageShell';
import { getAllPosts } from '@/lib/blog';
import { SITE_AUTHOR, SITE_URL } from '@/lib/site';
import { CONTENT_MAX_WIDTH } from '@/theme/layout';
import { Box } from '@mui/material';
import type { Metadata } from 'next';

const BLOG_DESCRIPTION =
  'Technical articles, talks, and professional updates in English by Itaru OTA.';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Itaru OTA',
    description: BLOG_DESCRIPTION,
    url: '/blog',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: 'Blog | Itaru OTA',
    description: BLOG_DESCRIPTION,
    inLanguage: 'en',
    author: SITE_AUTHOR,
    publisher: SITE_AUTHOR,
    blogPost: allPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      url: post.frontmatter.externalUrl ?? `${SITE_URL}/blog/${post.slug}`,
      keywords: post.frontmatter.tags?.join(', '),
      author: SITE_AUTHOR,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <PageShell>
        <Box
          component="main"
          sx={{ mx: 'auto', my: 4, maxWidth: CONTENT_MAX_WIDTH }}
        >
          <BlogList initialPosts={allPosts} />
        </Box>
      </PageShell>
    </>
  );
}
