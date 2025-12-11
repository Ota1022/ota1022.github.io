import { mdxComponents } from '@/components/blog/MDXComponents';
import Header from '@/components/layout/Header';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import { Box, Chip, Container, Link, Typography } from '@mui/material';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import rehypeHighlight from 'rehype-highlight';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMMM d, yyyy');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'primary';
      case 'activity':
        return 'secondary';
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

        <Box sx={{ mb: 3 }}>
          <Chip
            label={frontmatter.category}
            color={getCategoryColor(frontmatter.category) as 'primary' | 'secondary' | 'default'}
            size="small"
            sx={{ mb: 2 }}
          />
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
            '& pre': {
              bgcolor: 'action.selected',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
            },
            '& code': {
              fontFamily: 'monospace',
            },
          }}
        >
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
