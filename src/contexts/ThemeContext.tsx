'use client';

import baseTheme from '@/theme/theme';
import type { Theme } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ThemeMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'dark',
});

export function ToggleColorMode(): {
  colorMode: ColorModeContextType;
  theme: Theme;
} {
  // Load saved settings from local storage
  const [mode, setMode] = useState<ThemeMode>('dark');

  // Access local storage only on client side
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode as ThemeMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        // Save settings to local storage
        localStorage.setItem('themeMode', newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => {
    // Create theme according to mode
    if (mode === 'light') {
      return responsiveFontSizes(createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                color: 'inherit',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: 'inherit',
              },
            },
          },
        },
      }));
    }
    // For dark mode, use baseTheme as is
    return responsiveFontSizes(createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
      },
    }));
  }, [mode]);

  return { colorMode, theme };
}
