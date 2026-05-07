import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "twiscope-storage-s3.s3.me-south-1.amazonaws.com",
      "via.placeholder.com",
      "d3lkc3n5th01x7.cloudfront.net",
      "i.pinimg.com",
    ],
  },
};

export default nextConfig;
