/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'github-readme-stats.vercel.app', 'github-readme-streak-stats.herokuapp.com'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Portofolio-Website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portofolio-Website/' : '',
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;