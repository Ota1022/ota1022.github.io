'use client';

import { formatDateOnly } from '@/lib/date';
import type { BlogPostMetadata } from '@/types/blog';
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
    <Box component="li" sx={{ mb: 2.5, '&:last-of-type': { mb: 0 } }}>
      <Card
        sx={{
          position: 'relative',
          transition:
            'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'primary.main',
          },
          '&:focus-within': {
            borderColor: 'primary.main',
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
          '@media (prefers-reduced-motion: reduce)': {
            '&:hover': { transform: 'none' },
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
              mb: 1,
            }}
          >
            <BlogCategoryChip
              category={frontmatter.category}
              marginBottom={0}
            />
            <Typography
              component="time"
              dateTime={frontmatter.date}
              variant="caption"
              color="text.secondary"
            >
              {formattedDate}
            </Typography>
            {post.readingTimeMinutes && (
              <Typography variant="caption" color="text.secondary">
                · {post.readingTimeMinutes} min read
              </Typography>
            )}
          </Box>

          <Typography variant="h5" component={headingLevel} sx={{ mb: 1 }}>
            <Link
              component={isExternal ? 'a' : NextLink}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              aria-label={
                isExternal
                  ? `${frontmatter.title}, opens in a new tab`
                  : undefined
              }
              underline="hover"
              color="inherit"
              // Stretch the anchor across the card so the whole card stays
              // clickable while the link text stays limited to the title.
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                },
                '&:focus-visible': { outline: 'none' },
              }}
            >
              {frontmatter.title}
              {isExternal && (
                <OpenInNewIcon
                  aria-hidden="true"
                  sx={{
                    ml: 0.75,
                    fontSize: '0.7em',
                    verticalAlign: 'middle',
                    color: 'text.secondary',
                  }}
                />
              )}
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {frontmatter.description}
          </Typography>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
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
    </Box>
  );
}
