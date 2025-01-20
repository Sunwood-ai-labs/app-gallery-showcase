/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.huggingface.co',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = nextConfig
