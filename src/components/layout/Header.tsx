'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const { mode, systemMode, setMode } = useColorScheme();
  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = (resolvedMode ?? 'dark') === 'dark';
  const nextMode = isDark ? 'light' : 'dark';

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'transparent',
        color: 'text.primary',
        borderRadius: 1,
        px: { xs: 2, sm: 3 },
        py: 3,
        fontFamily: 'var(--font-inconsolata)',
      }}
    >
      <Box
        component="nav"
        aria-label="Primary navigation"
        sx={{ display: 'flex', gap: 3 }}
      >
        <Link
          component={NextLink}
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          underline="none"
          color="inherit"
          sx={{
            '&:hover': { opacity: 0.8 },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 4,
            },
          }}
        >
          <Typography variant="h6" component="span" fontFamily="inherit">
            Home
          </Typography>
        </Link>
        <Link
          component={NextLink}
          href="/blog"
          aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          underline="none"
          color="inherit"
          sx={{
            '&:hover': { opacity: 0.8 },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 4,
            },
          }}
        >
          <Typography variant="h6" component="span" fontFamily="inherit">
            Blog
          </Typography>
        </Link>
        <Link
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="inherit"
          aria-label="Open CV as a PDF in a new tab"
          sx={{
            '&:hover': { opacity: 0.8 },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 4,
            },
          }}
        >
          <Typography variant="h6" component="span" fontFamily="inherit">
            CV
          </Typography>
        </Link>
      </Box>

      <Tooltip title={`Switch to ${nextMode} mode`}>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => setMode(nextMode)}
          color="inherit"
          aria-label={`Switch to ${nextMode} mode`}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
