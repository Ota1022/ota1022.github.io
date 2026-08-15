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
          gap: 1.5,
          py: 1,
          '&:hover': {
            '& .github-repo-name': {
              textDecoration: 'underline',
              textUnderlineOffset: '0.18em',
            },
          },
        }}
      >
        <GitHubIcon
          sx={{ fontSize: 32, color: 'text.secondary', flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            className="github-repo-name"
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
        <OpenInNewIcon
          sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }}
        />
      </Box>
    </MuiLink>
  );
}
