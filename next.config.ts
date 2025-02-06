import type { NextConfig } from "next"

//const isProd = process.env.NODE_ENV === "production"
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  // assetPrefix: isProd ? "/jonathankennell.com/" : "",
  // basePath: isProd ? "/jonathankennell.com" : "",
  output: "export",
}

export default nextConfig
