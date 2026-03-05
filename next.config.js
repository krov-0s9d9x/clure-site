/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  output: 'export'
}

module.exports = nextConfig
