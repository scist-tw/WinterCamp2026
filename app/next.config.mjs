/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Disable Next.js Image Optimization API for `output: 'export'` (static export)
    // This allows `next/image` to render without the image optimizer in export mode.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/avatar/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Add cache headers and CSP
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/gallery/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://font.emtech.cc; font-src 'self' https://fonts.gstatic.com https://font.emtech.cc data:; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@studio-freight/lenis",
    ],
  },
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
  // Production optimizations
  productionBrowserSourceMaps: false,
  generateBuildId: async () => {
    return "winter-camp-2026";
  },
};

export default nextConfig;
