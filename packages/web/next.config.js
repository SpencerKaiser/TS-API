/* cSpell:disable */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/@:handle',
        destination: '/hosts/:handle',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/customurl',
        destination: '/',
        permanent: true,
      },
      {
        source: '/@customurl',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
