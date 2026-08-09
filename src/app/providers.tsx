'use client';

import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { ReactNode } from 'react';
import theme from '@/theme/theme';

export default function ClientProviders({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <Experimental_CssVarsProvider
        theme={theme}
        defaultMode="system"
        modeStorageKey="themeMode"
        disableTransitionOnChange
      >
        <CssBaseline />
        {children}
      </Experimental_CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
