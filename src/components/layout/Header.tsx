'use client';

import { ColorModeContext } from '@/contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import React from 'react';

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'transparent',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link
          component={NextLink}
          href="/"
          underline="none"
          color="inherit"
          sx={{
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <Typography variant="h6" component="span">
            Home
          </Typography>
        </Link>
        <Link
          component={NextLink}
          href="/blog"
          underline="none"
          color="inherit"
          sx={{
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <Typography variant="h6" component="span">
            Blog
          </Typography>
        </Link>
      </Box>

      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
