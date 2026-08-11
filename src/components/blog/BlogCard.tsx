'use client';

import type { BlogPostMetadata } from '@/types/blog';
import { formatDateOnly } from '@/lib/date';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import BlogCategoryChip from './BlogCategoryChip';

interface BlogCardProps {
  post: BlogPostMetadata;
  headingLevel?: 'h2' | 'h3';
}

export default function BlogCard({ post, headingLevel = 'h2' }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const formattedDate = formatDateOnly(frontmatter.date, 'short');

  const href = frontmatter.externalUrl || `/blog/${slug}`;
  const isExternal = !!frontmatter.externalUrl;

  return (
    <Link
      component={isExternal ? 'a' : NextLink}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={
        isExternal
          ? `${frontmatter.title}, opens in a new tab`
          : frontmatter.title
      }
      underline="none"
      color="inherit"
      display="block"
      sx={{ mb: 2.5 }}
    >
      <Card
        sx={{
          transition:
            'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'primary.main',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '&:hover': { transform: 'none' },
          },
          cursor: 'pointer',
        }}
      >
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <BlogCategoryChip category={frontmatter.category} />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {formattedDate}
            </Typography>
            {post.readingTimeMinutes && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                · {post.readingTimeMinutes} min read
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              variant="h5"
              component={headingLevel}
              gutterBottom
              sx={{ mb: 1, flex: 1 }}
            >
              {frontmatter.title}
            </Typography>
            {isExternal && (
              <OpenInNewIcon
                aria-hidden="true"
                sx={{ mt: 0.5, fontSize: 18, color: 'text.secondary' }}
              />
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {frontmatter.description}
          </Typography>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {frontmatter.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
