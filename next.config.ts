import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ["twiscope-storage-s3.s3.me-south-1.amazonaws.com", "via.placeholder.com"],
  },
};

export default nextConfig;
