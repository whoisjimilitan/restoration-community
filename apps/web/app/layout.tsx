import type { Metadata } from 'next';
import { Providers } from './providers';
import { frauncesFontClass } from '../tailwind.config';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brother Jimi',
  description: 'A Servant of Jesus Christ.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
      </body>
    </html>
  );
}
