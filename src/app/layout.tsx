import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import ClientProviders from './providers';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ota1022.github.io'),
  title: { default: 'Itaru OTA', template: '%s | Itaru OTA' },
  description: 'Portfolio of Itaru OTA',
  openGraph: {
    type: 'website',
    siteName: 'Itaru OTA',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DKVJZRT90P"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DKVJZRT90P');
          `}
        </Script>
      </head>
      <body className={inconsolata.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
