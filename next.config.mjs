const nextConfig = {
  // assetPrefix: '/portfolio/',
  // Keep static export production-only so dynamic routes remain available in dev.
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  transpilePackages: ['rehype-pretty-code', 'shiki'],
};

export default nextConfig;
