/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ['@zooai/cloud-brand', '@zooai/cloud-ui'],
}

export default nextConfig
