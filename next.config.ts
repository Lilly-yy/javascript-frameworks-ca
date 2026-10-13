
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.noroff.dev",
        pathname: "/api/online-shop/**",
      },
    ],
  },
};

export default nextConfig;
