import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Inter } from 'next/font/google';
import { Providers } from './providers';
import LetsConnectPersistence from '@/components/LetsConnectPersistence';
import Navigation from '@/components/Navigation';
import './globals.css';

// Self-hosted via next/font: downloaded once at build time, served from our
// own domain with font-display: swap baked in — no render-blocking request
// to fonts.googleapis.com on every page load.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brother Jimi',
  description: 'A Servant of Jesus Christ.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navigation />
        <Providers>{children}</Providers>
        {/* Let's Connect — live/AI prayer chat, site-wide. afterInteractive
            loads it right after the page is usable, without blocking the
            hero video's first paint — more reliable than lazyOnload, which
            waits for full browser idle and can be delayed or inconsistent. */}
        <Script
          id="9GBWhxT8KsCsuVDzXge3"
          src="https://app.letsconnect.at/embed.js"
          strategy="afterInteractive"
        />
        <LetsConnectPersistence />
      </body>
    </html>
  );
}
