/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  serverExternalPackages: ["pdf-parse"],
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
