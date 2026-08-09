import { getBlogCategoryDefinition } from '@/lib/blog-schema';
import type { BlogCategory } from '@/types/blog';
import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';

interface BlogCategoryChipProps {
  category: BlogCategory;
  marginBottom?: number;
}

export default function BlogCategoryChip({
  category,
  marginBottom = 1,
}: BlogCategoryChipProps) {
  const definition = getBlogCategoryDefinition(category);
  const isTeal = definition?.chipColor === 'teal';

  return (
    <Chip
      label={definition?.label}
      color={(isTeal ? 'default' : definition?.chipColor) as ChipProps['color']}
      size="small"
      sx={{
        mb: marginBottom,
        ...(isTeal && {
          backgroundColor: '#26a69a',
          color: '#fff',
        }),
      }}
    />
  );
}
