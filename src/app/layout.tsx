'use client';

import { ColorModeContext, ToggleColorMode } from '@/contexts/ThemeContext';
import '@/styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Inconsolata } from 'next/font/google';
import type { ReactNode } from 'react';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const { colorMode, theme } = ToggleColorMode();

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DKVJZRT90P"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DKVJZRT90P');
            `,
          }}
        />
      </head>
      <body className={inconsolata.className}>
        <ColorModeContext.Provider value={colorMode}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
