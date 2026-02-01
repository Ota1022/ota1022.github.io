import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Link as MuiLink, Typography } from '@mui/material';

interface GitHubRepoCardProps {
  url: string;
  description?: string;
}

export function GitHubRepoCard({ url, description }: GitHubRepoCardProps) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  const owner = match?.[1] ?? '';
  const repo = match?.[2]?.replace(/\.git$/, '') ?? '';

  return (
    <MuiLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{ display: 'block', my: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          border: 1,
          borderColor: 'grey.700',
          borderRadius: 2,
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'grey.500',
            bgcolor: 'rgba(255, 255, 255, 0.06)',
          },
        }}
      >
        <GitHubIcon sx={{ fontSize: 40, color: 'grey.400', flexShrink: 0 }} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {owner}/{repo}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <OpenInNewIcon sx={{ fontSize: 18, color: 'grey.500', flexShrink: 0 }} />
      </Box>
    </MuiLink>
  );
}
