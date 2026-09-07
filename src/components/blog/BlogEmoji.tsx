import { getBlogPostEmoji } from '@/lib/blog-schema';
import type { BlogPostFrontmatter } from '@/types/blog';
import { Box } from '@mui/material';

type BlogEmojiSize = 'small' | 'large';

interface BlogEmojiProps {
  frontmatter: BlogPostFrontmatter;
  size?: BlogEmojiSize;
}

const SIZES: Record<BlogEmojiSize, { box: number; fontSize: string }> = {
  small: { box: 56, fontSize: '1.75rem' },
  large: { box: 88, fontSize: '2.75rem' },
};

export default function BlogEmoji({
  frontmatter,
  size = 'small',
}: BlogEmojiProps) {
  const { box, fontSize } = SIZES[size];

  return (
    <Box
      aria-hidden="true"
      sx={{
        flexShrink: 0,
        width: box,
        height: box,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        bgcolor: 'action.hover',
        fontSize,
        lineHeight: 1,
        fontFamily:
          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      }}
    >
      {getBlogPostEmoji(frontmatter)}
    </Box>
  );
}
