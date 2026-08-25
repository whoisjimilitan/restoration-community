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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Let's Connect — live/AI prayer chat, site-wide. lazyOnload so it
            never competes with the hero video for the first paint. */}
        <Script
          id="9GBWhxT8KsCsuVDzXge3"
          src="https://app.letsconnect.at/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
