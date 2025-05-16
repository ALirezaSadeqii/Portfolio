/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // optional: skip if not using next/image
  basePath: '/Portfolio',        // replace with your repo name
  assetPrefix: '/Portfolio/',
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig; 