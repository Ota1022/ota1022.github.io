import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import type { ReactNode } from 'react';
import ClientProviders from './providers';

const inconsolata = localFont({
  src: '../assets/fonts/Inconsolata-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['monospace'],
  variable: '--font-inconsolata',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ota1022.github.io'),
  title: { default: 'Itaru OTA', template: '%s | Itaru OTA' },
  description:
    'Portfolio of Itaru OTA, a software engineer specializing in cloud infrastructure, AWS, and developer tools.',
  authors: [{ name: 'Itaru OTA', url: 'https://ota1022.github.io' }],
  creator: 'Itaru OTA',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Itaru OTA',
    title: 'Itaru OTA',
    description:
      'Software engineer specializing in cloud infrastructure, AWS, and developer tools.',
    url: '/',
    locale: 'en_US',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itaru OTA',
    description:
      'Software engineer specializing in cloud infrastructure, AWS, and developer tools.',
    images: ['/og/default.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Itaru OTA',
  alternateName: 'Itaru Ota',
  url: 'https://ota1022.github.io',
  image: 'https://ota1022.github.io/profile.webp',
  jobTitle: 'Software Engineer',
  sameAs: [
    'https://github.com/Ota1022',
    'https://www.linkedin.com/in/itaru-ota/',
    'https://x.com/iorandd',
    'https://speakerdeck.com/ota1022',
    'https://zenn.dev/iorandd',
    'https://www.credly.com/users/itaru-ota',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={inconsolata.variable}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
