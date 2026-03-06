/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/universe',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
