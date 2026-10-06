/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/today', destination: '/today/index.html' },
        { source: '/today/:date(\\d{4}-\\d{2}-\\d{2})', destination: '/today/:date/index.html' },
        { source: '/start', destination: '/start/index.html' },
        { source: '/welcome', destination: '/welcome/index.html' },
        { source: '/welcome/received', destination: '/welcome/received/index.html' },
        { source: '/partner', destination: '/partner/index.html' },
      ],
    }
  },
}

module.exports = nextConfig
