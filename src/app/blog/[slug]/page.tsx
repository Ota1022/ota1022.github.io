import { mdxComponents } from '@/components/blog/MDXComponents';
import Header from '@/components/layout/Header';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import { Box, Chip, Container, Link, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const PLACEHOLDER_SLUG = '__blog-placeholder__';

interface BlogPostPageProps {
  params: {
    slug: string;
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const hasAnyPosts = getAllPostSlugs().length > 0;
  const post = getPostBySlug(params.slug);

  if (!post) {
    // Only show the placeholder page when there are zero posts.
    // This prevents conflicts if someone ever creates a real post whose slug
    // happens to match the placeholder.
    if (!hasAnyPosts && params.slug === PLACEHOLDER_SLUG) {
      return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Header />
          <Box sx={{ my: 4 }}>
            <Link
              component={NextLink}
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
        </Container>
      );
    }
    notFound();
  }

  const { frontmatter, content } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMMM d, yyyy');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'blog':
        return { bg: '#26a69a', text: '#fff' }; // teal
      case 'zenn':
        return 'primary';
      case 'speakerdeck':
        return 'success';
      case 'activity':
        return 'secondary';
      case 'announcement':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />

      <Box sx={{ my: 4 }}>
        <Link
          component={NextLink}
          href="/blog"
          underline="hover"
          sx={{ mb: 2, display: 'inline-block' }}
        >
          ← Back to Blog
        </Link>

        <Paper elevation={2} sx={{ p: 4, mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            {(() => {
              const colorValue = getCategoryColor(frontmatter.category);
              const isCustomColor = typeof colorValue === 'object';
              return (
                <Chip
                  label={frontmatter.category}
                  color={isCustomColor ? 'default' : colorValue as 'primary' | 'secondary' | 'success' | 'warning' | 'default'}
                  size="small"
                  sx={{
                    mb: 2,
                    ...(isCustomColor && {
                      backgroundColor: colorValue.bg,
                      color: colorValue.text,
                    }),
                  }}
                />
              );
            })()}
            <Typography variant="h3" component="h1" gutterBottom>
              {frontmatter.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {formattedDate}
            </Typography>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
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
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
