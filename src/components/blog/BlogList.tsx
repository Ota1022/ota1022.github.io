'use client';

import BlogCard from '@/components/blog/BlogCard';
import { getBlogCategoryDefinition } from '@/lib/blog-schema';
import type { BlogCategory, BlogPostMetadata } from '@/types/blog';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface BlogListProps {
  initialPosts: BlogPostMetadata[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | 'all'
  >('all');
  const availableCategories = Array.from(
    new Set(initialPosts.map((post) => post.frontmatter.category))
  );

  const filteredPosts =
    selectedCategory === 'all'
      ? initialPosts
      : initialPosts.filter(
          (post) => post.frontmatter.category === selectedCategory
        );

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Writing &amp; Talks
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Selected technical writing, talks, and professional updates in English.
      </Typography>

      <Box sx={{ my: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Type</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Type"
            onChange={(e) =>
              setSelectedCategory(e.target.value as BlogCategory | 'all')
            }
          >
            <MenuItem value="all">All entries</MenuItem>
            {availableCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {getBlogCategoryDefinition(category)?.filterLabel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          No entries found.
        </Typography>
      ) : (
        <Box>
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Box>
      )}
    </>
  );
}
