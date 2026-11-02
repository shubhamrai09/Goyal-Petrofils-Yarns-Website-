import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static marketing site: every page is prerendered at build time.
  // Cache Components is not needed and would block `dynamicParams = false` (real 404s for unknown slugs).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Old Shopify URLs that have no direct equivalent on the new site.
  // Every content URL (pages, products, collections/handicraft-yarns, blogs, articles) is kept as-is.
  async redirects() {
    return [
      { source: "/collections/all", destination: "/pages/product-range", permanent: true },
      { source: "/collections/frontpage", destination: "/", permanent: true },
      { source: "/collections/handicraft-yarns/products/:handle", destination: "/products/:handle", permanent: true },
      { source: "/blogs/news", destination: "/blogs/geetex-blog", permanent: true },
      { source: "/blogs/:blog/tagged/:tag", destination: "/blogs/:blog", permanent: true },
      { source: "/cart", destination: "/pages/contact", permanent: false },
      { source: "/account/:path*", destination: "/", permanent: false },
      { source: "/customer_authentication/:path*", destination: "/", permanent: false },
      { source: "/search", destination: "/pages/product-range", permanent: false },
    ];
  },
};

export default nextConfig;
