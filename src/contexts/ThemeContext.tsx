'use client';

import { type Theme, createTheme } from '@mui/material/styles';
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
        console.log(mode);
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return { colorMode, theme };
}
