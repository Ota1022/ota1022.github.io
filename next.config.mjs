const nextConfig = {
  // assetPrefix: '/portfolio/',
  // output: 'export' breaks `next dev` for dynamic routes in Next.js 14,
  // so only enable it for production builds.
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  transpilePackages: ['rehype-pretty-code', 'shiki'],
};

export default nextConfig;
