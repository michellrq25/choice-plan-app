import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disables Webpack's disk-based pack cache in development on Windows
      // This permanently prevents ENOENT .pack.gz and stale chunk (Cannot find module) errors
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;

