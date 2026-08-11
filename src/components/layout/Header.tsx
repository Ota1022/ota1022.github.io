'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export default function Header() {
  const pathname = usePathname();
  const { mode, systemMode, setMode } = useColorScheme();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );

  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = isHydrated ? (resolvedMode ?? 'dark') === 'dark' : true;
  const nextMode = isDark ? 'light' : 'dark';
  const themeToggleLabel = isHydrated
    ? `Switch to ${nextMode} mode`
    : 'Toggle color mode';

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
        borderBottom: 1,
        borderColor: 'divider',
        px: 0,
        py: { xs: 2, sm: 2.5 },
        fontFamily: 'var(--font-inconsolata)',
      }}
    >
      <Box
        component="nav"
        aria-label="Primary navigation"
        sx={{ display: 'flex', gap: { xs: 2.5, sm: 3.5 } }}
      >
        <Link
          component={NextLink}
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          underline="none"
          color="inherit"
          sx={{
            position: 'relative',
            color: 'text.secondary',
            transition: 'color 160ms ease',
            '&:hover': { color: 'text.primary' },
            '&[aria-current="page"]': { color: 'primary.main' },
            '&[aria-current="page"]::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              bottom: -10,
              left: 0,
              height: 2,
              bgcolor: 'primary.main',
            },
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
            position: 'relative',
            color: 'text.secondary',
            transition: 'color 160ms ease',
            '&:hover': { color: 'text.primary' },
            '&[aria-current="page"]': { color: 'primary.main' },
            '&[aria-current="page"]::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              bottom: -10,
              left: 0,
              height: 2,
              bgcolor: 'primary.main',
            },
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
            color: 'text.secondary',
            transition: 'color 160ms ease',
            '&:hover': { color: 'text.primary' },
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

      <Tooltip title={themeToggleLabel}>
        <IconButton
          sx={{
            ml: 1,
            color: 'text.secondary',
            '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
          }}
          onClick={() => setMode(nextMode)}
          color="inherit"
          aria-label={themeToggleLabel}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
