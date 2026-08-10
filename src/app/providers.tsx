'use client';

import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { ReactNode } from 'react';
import theme from '@/theme/theme';
import {
  COLOR_SCHEME_ATTRIBUTE,
  DEFAULT_MODE,
  MODE_STORAGE_KEY,
} from './theme-config';

export default function ClientProviders({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <Experimental_CssVarsProvider
        theme={theme}
        defaultMode={DEFAULT_MODE}
        modeStorageKey={MODE_STORAGE_KEY}
        attribute={COLOR_SCHEME_ATTRIBUTE}
        disableTransitionOnChange
      >
        <CssBaseline />
        {children}
      </Experimental_CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
