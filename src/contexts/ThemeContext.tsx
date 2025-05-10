'use client';

import baseTheme from '@/theme/theme';
import type { Theme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

export function ToggleColorMode(): {
  colorMode: ColorModeContextType;
  theme: Theme;
} {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () => ({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
      },
    }),
    [mode]
  );

  return { colorMode, theme };
}
