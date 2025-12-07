import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // productionBrowserSourceMaps: false,
  // compiler: {
  //   sourceMaps: false,
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
