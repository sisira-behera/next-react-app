import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false, // Hides the development button entirely
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
 
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);