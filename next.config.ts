import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export
  images: { unoptimized: true }, // Needed if using Next.js image optimization
}

export default nextConfig
