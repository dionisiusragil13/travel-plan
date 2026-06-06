import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["pdfkit"],
  images: {
    unoptimized: true,
  },
  
};

export default nextConfig;
