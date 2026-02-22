'use client';

import type { BlogPostMetadata } from '@/types/blog';
import { Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import { format } from 'date-fns';
import NextLink from 'next/link';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMM d, yyyy');

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

  const href = frontmatter.externalUrl || `/blog/${slug}`;
  const isExternal = !!frontmatter.externalUrl;

  return (
    <Link
      component={isExternal ? 'a' : NextLink}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      underline="none"
      color="inherit"
      display="block"
      sx={{ mb: 3 }}
    >
      <Card
        sx={{
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          },
          cursor: 'pointer',
        }}
      >
        <CardContent>
          <Box sx={{ mb: 1 }}>
            {(() => {
              const colorValue = getCategoryColor(frontmatter.category);
              const isCustomColor = typeof colorValue === 'object';
              return (
                <Chip
                  label={frontmatter.category}
                  color={isCustomColor ? 'default' : colorValue as 'primary' | 'secondary' | 'success' | 'warning' | 'default'}
                  size="small"
                  sx={{
                    mb: 1,
                    ...(isCustomColor && {
                      backgroundColor: colorValue.bg,
                      color: colorValue.text,
                    }),
                  }}
                />
              );
            })()}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {formattedDate}
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 1 }}>
            {frontmatter.title}
          </Typography>

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
