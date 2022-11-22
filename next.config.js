/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   unoptimized: true
  // },
  env: {
    SERVER_HOST: 'http://localhost:5000',
    BLOG_API_ROUTE: 'api/blog'
  }
}

module.exports = nextConfig
