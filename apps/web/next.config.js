/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async redirects() {
    return [
      {
        source: '/stories',
        destination: '/deliverances',
        permanent: true,
      },
      {
        source: '/gathering',
        destination: '/?attend=1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
