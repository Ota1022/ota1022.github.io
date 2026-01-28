'use client';

import BlogCard from '@/components/blog/BlogCard';
import Header from '@/components/layout/Header';
import type { BlogCategory, BlogPostMetadata } from '@/types/blog';
import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';

interface BlogListProps {
  initialPosts: BlogPostMetadata[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  const filteredPosts =
    selectedCategory === 'all'
      ? initialPosts
      : initialPosts.filter((post) => post.frontmatter.category === selectedCategory);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />

      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Technical articles, conference talks, and other activities.
        </Typography>

        <Box sx={{ my: 3 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value as BlogCategory | 'all')}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="blog">Blog</MenuItem>
              <MenuItem value="zenn">Zenn</MenuItem>
              <MenuItem value="speakerdeck">SpeakerDeck</MenuItem>
              <MenuItem value="award">Award</MenuItem>
              <MenuItem value="activity">Activity</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {filteredPosts.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
            No posts found.
          </Typography>
        ) : (
          <Box>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
