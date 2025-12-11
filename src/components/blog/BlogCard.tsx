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
      case 'tech':
        return 'primary';
      case 'activity':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Chip
            label={frontmatter.category}
            color={getCategoryColor(frontmatter.category) as 'primary' | 'secondary' | 'default'}
            size="small"
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {formattedDate}
          </Typography>
        </Box>

        <Link
          component={NextLink}
          href={`/blog/${slug}`}
          underline="none"
          color="inherit"
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 1 }}>
            {frontmatter.title}
          </Typography>
        </Link>

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
  );
}
