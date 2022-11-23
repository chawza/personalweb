/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   unoptimized: true
  // },
  env: {
    DB_USERNAME: '<DB_USERNAME>',
    DB_PASSWORD: '<DB_PASSWORD>',
    DB_CONN_HOSTNAME: '<DB_HOST_CONN>',
    DB_CONN_PORT: '<DB_HOST_PORT>',
    DB_NAME: '<OWNER_USERNAME_IN_DB>',
  }
}

module.exports = nextConfig
