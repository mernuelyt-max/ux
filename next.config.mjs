/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Server Actions are stable in 14.x; kept explicit for clarity.
  },
};

export default nextConfig;
