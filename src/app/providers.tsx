'use client';

import { ColorModeContext, ToggleColorMode } from '@/contexts/ThemeContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { ReactNode } from 'react';

export default function ClientProviders({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const { colorMode, theme } = ToggleColorMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ColorModeContext.Provider>
  );
}
