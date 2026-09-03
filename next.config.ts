import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aglassalonpr.com" }],
        destination: "https://www.aglassalonpr.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
