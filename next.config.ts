import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "twiscope-storage-s3.s3.me-south-1.amazonaws.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "d3lkc3n5th01x7.cloudfront.net" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
