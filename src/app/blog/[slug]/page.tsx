import BlogCard from '@/components/blog/BlogCard';
import BlogCategoryChip from '@/components/blog/BlogCategoryChip';
import { mdxComponents } from '@/components/blog/MDXComponents';
import PageShell from '@/components/layout/PageShell';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { formatDateOnly } from '@/lib/date';
import { extractTableOfContents, groupTableOfContents } from '@/lib/markdown';
import { Box, Chip, Link, Paper, Typography } from '@mui/material';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const PLACEHOLDER_SLUG = '__blog-placeholder__';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }
  const { frontmatter } = post;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: 'Itaru OTA', url: 'https://ota1022.github.io' }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${slug}`,
      images: [{ url: `/og/${slug}.png`, width: 1200, height: 630 }],
      publishedTime: frontmatter.date,
      authors: ['Itaru OTA'],
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [`/og/${slug}.png`],
    },
  };
}

// For Static Export (output: 'export'), dynamic routes must:
// - enumerate all params to pre-render, and
// - disable fallback (no runtime generation).
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const slugs = getAllPostSlugs();
  // Generate a single placeholder page so the export build won't fail
  // even when there are zero blog posts (no slugs to pre-render).
  if (slugs.length === 0) {
    return [{ slug: PLACEHOLDER_SLUG }];
  }
  return slugs.map((slug) => ({
    slug,
  }));
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const hasAnyPosts = getAllPostSlugs().length > 0;
  const post = getPostBySlug(slug);

  if (!post) {
    // Only show the placeholder page when there are zero posts.
    // This prevents conflicts if someone ever creates a real post whose slug
    // happens to match the placeholder.
    if (!hasAnyPosts && slug === PLACEHOLDER_SLUG) {
      return (
        <PageShell>
          <Box component="main" sx={{ my: 4 }}>
            <Link
              href="/blog"
              underline="hover"
              sx={{ mb: 2, display: 'inline-block' }}
            >
              ← Back to Blog
            </Link>
            <Typography variant="h4" component="h1" gutterBottom>
              Coming soon
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Blog posts are coming soon.
            </Typography>
          </Box>
        </PageShell>
      );
    }
    notFound();
  }

  const { frontmatter, content, readingTimeMinutes } = post;
  const formattedDate = formatDateOnly(frontmatter.date);
  const tableOfContents = extractTableOfContents(content);
  const tableOfContentsSections = groupTableOfContents(tableOfContents);
  const sectionHeadings = tableOfContents.filter(
    (heading) => heading.level === 2
  );
  const headingsIncludeSectionNumbers =
    sectionHeadings.length > 0 &&
    sectionHeadings.every((heading) => /^\d+\.\s+/.test(heading.title));
  const relatedPosts = getRelatedPosts(slug);
  const postUrl = `https://ota1022.github.io/blog/${slug}`;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: `https://ota1022.github.io/og/${slug}.png`,
    author: {
      '@type': 'Person',
      name: 'Itaru OTA',
      url: 'https://ota1022.github.io',
    },
    publisher: {
      '@type': 'Person',
      name: 'Itaru OTA',
      url: 'https://ota1022.github.io',
    },
    keywords: frontmatter.tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <PageShell>
        <Box component="main" sx={{ my: 4 }}>
          <Link
            href="/blog"
            underline="hover"
            sx={{ mb: 2, display: 'inline-block' }}
          >
            ← Back to Blog
          </Link>

          <Paper
            component="article"
            elevation={2}
            sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: 2 }}
          >
            <Box sx={{ mb: 3 }}>
              <BlogCategoryChip
                category={frontmatter.category}
                marginBottom={2}
              />
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.25rem', sm: '3rem' },
                  lineHeight: 1.1,
                }}
              >
                {frontmatter.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <Box component="time" dateTime={frontmatter.date}>
                  {formattedDate}
                </Box>
                {' · '}
                {readingTimeMinutes} min read
              </Typography>
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <Box
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}
                >
                  {frontmatter.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>

            {tableOfContents.length > 1 && (
              <Box
                component="nav"
                aria-label="Table of contents"
                sx={{
                  mb: 4,
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  On this page
                </Typography>
                <Box
                  component="ol"
                  sx={{ m: 0, pl: 3.5, maxHeight: 360, overflowY: 'auto' }}
                >
                  {tableOfContentsSections.map(({ heading, children }) => (
                    <Box
                      component="li"
                      key={`${heading.level}-${heading.id}`}
                      sx={{ py: 0.25, pl: 0.5 }}
                    >
                      <Link href={`#${heading.id}`} underline="hover">
                        {headingsIncludeSectionNumbers
                          ? heading.title.replace(/^\d+\.\s+/, '')
                          : heading.title}
                      </Link>
                      {children.length > 0 && (
                        <Box component="ul" sx={{ mt: 0.25, mb: 0.25, pl: 3 }}>
                          {children.map((child) => (
                            <Box
                              component="li"
                              key={`${child.level}-${child.id}`}
                              sx={{ py: 0.25, pl: 0.25 }}
                            >
                              <Link href={`#${child.id}`} underline="hover">
                                {child.title}
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box
              sx={{
                '& code': {
                  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                  fontSize: '0.95em',
                },
              }}
            >
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      [
                        rehypePrettyCode,
                        { theme: 'github-dark', keepBackground: true },
                      ],
                    ],
                  },
                }}
              />
            </Box>
          </Paper>

          {relatedPosts.length > 0 && (
            <Box
              component="section"
              aria-labelledby="related-writing"
              sx={{ mt: 5 }}
            >
              <Typography
                id="related-writing"
                variant="h4"
                component="h2"
                sx={{ mb: 2 }}
              >
                Related writing &amp; talks
              </Typography>
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  headingLevel="h3"
                />
              ))}
            </Box>
          )}
        </Box>
      </PageShell>
    </>
  );
}
