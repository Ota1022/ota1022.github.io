import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Link as MuiLink, Typography } from '@mui/material';

interface ExternalArticleCardProps {
  url: string;
  source: string;
  title: string;
  description?: string;
}

export function ExternalArticleCard({
  url,
  source,
  title,
  description,
}: ExternalArticleCardProps) {
  return (
    <MuiLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      aria-label={`${title}, opens in a new tab`}
      sx={{
        display: 'block',
        my: 3,
        borderRadius: 2,
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'transparent',
          transition: 'border-color 160ms ease',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
      >
        <ArticleOutlinedIcon
          aria-hidden="true"
          sx={{ fontSize: 32, color: 'text.secondary', flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {source}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 0.25, fontWeight: 650, color: 'text.primary' }}
          >
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
        <OpenInNewIcon
          aria-hidden="true"
          sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }}
        />
      </Box>
    </MuiLink>
  );
}
