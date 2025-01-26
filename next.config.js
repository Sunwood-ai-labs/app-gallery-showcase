/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // Fast Refreshの設定を最適化
  webpack: (config, { dev, isServer }) => {
    // 開発環境でのみ適用
    if (dev && !isServer) {
      // キャッシュの設定を最適化
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache'),
        store: 'pack',
        version: '1.0.0'
      };
    }
    return config;
  },
}

module.exports = nextConfig
