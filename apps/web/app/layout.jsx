import './globals.css'

export const metadata = {
  title'Brother Jimi — Receive Jesus',
  description'Start discovering who you are in Jesus. 90-day free mentorship.',
  openGraph{
    title'Brother Jimi — Receive Jesus',
    description'Start discovering who you are in Jesus.',
    type'website',
    url'https://brotherjimi.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}