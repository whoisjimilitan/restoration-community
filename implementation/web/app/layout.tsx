import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Restoration Community',
  description:
    'A Christian peer support and reintegration community for people leaving cybercrime and pursuing honest work and living.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0F766E" />
      </head>
      <body className="antialiased bg-white text-rc-charcoal">
        {children}
      </body>
    </html>
  );
}
