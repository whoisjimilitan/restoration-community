import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import { frauncesFontClass } from '../tailwind.config';
import './globals.css';

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
    <html lang="en" className={frauncesFontClass}>
      <body>
        <Providers>{children}</Providers>
        {/* Let's Connect — live/AI prayer chat, site-wide. lazyOnload so it
            never competes with the hero video for the first paint. */}
        <Script
          id="Ry1a6rs3kJcO7O3obT0S"
          src="https://app.letsconnect.at/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
