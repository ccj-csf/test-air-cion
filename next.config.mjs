import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
  // images: {
  //   loader: 'custom',
  //   loaderFile: './image-loader.js',
  // },
  images: {
    domains: ['github.com'], // 允许加载的外部图片域名列表
  },
  reactStrictMode: false,
  // 指定安全来源列表
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: [],
  //   }
  // }
};

export default withNextIntl(nextConfig);
