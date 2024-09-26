const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.contento.io',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
