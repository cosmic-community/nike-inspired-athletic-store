/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.cosmicjs.com',
      'imgix.cosmicjs.com'
    ],
  },
  experimental: {
    optimizePackageImports: ['@cosmicjs/sdk']
  }
}

module.exports = nextConfig