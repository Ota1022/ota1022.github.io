import { getBlogCategoryDefinition } from '@/lib/blog-schema';
import type { BlogCategory } from '@/types/blog';
import { Chip } from '@mui/material';

interface BlogCategoryChipProps {
  category: BlogCategory;
  marginBottom?: number;
}

export default function BlogCategoryChip({
  category,
  marginBottom = 1,
}: BlogCategoryChipProps) {
  const definition = getBlogCategoryDefinition(category);

  return (
    <Chip
      label={definition?.label}
      color="primary"
      variant="outlined"
      size="small"
      sx={{
        mb: marginBottom,
        bgcolor: 'transparent',
      }}
    />
  );
}
