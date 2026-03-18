import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.APP_URL || '',
};

export default nextConfig;
