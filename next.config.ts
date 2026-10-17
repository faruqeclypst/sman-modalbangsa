import type { NextConfig } from "next";

/**
 * WordPress origin — used for proxying /wp-admin, /wp-json, etc.
 * 
 * IMPORTANT: After pointing sman-modalbangsa.sch.id to Vercel, change this
 * to the WordPress server's direct hostname or subdomain (e.g. cms.sman-modalbangsa.sch.id)
 * to avoid a redirect loop. For now it uses www which still points to WP server.
 * 
 * Once Rumahweb fixes the cms subdomain, change to:
 * const WP_ORIGIN = "https://cms.sman-modalbangsa.sch.id";
 */
const WP_ORIGIN =
  process.env.WP_PROXY_ORIGIN ?? "https://www.sman-modalbangsa.sch.id";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000, // 1 year cache TTL for optimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sman-modalbangsa.sch.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sman-modalbangsa.sch.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.sman-modalbangsa.sch.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i2.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "disdik.acehprov.go.id",
        pathname: "/**",
      },
    ],
  },

  // Proxy WordPress paths to the original server so wp-admin and REST API
  // keep working after the domain points to Vercel.
  async rewrites() {
    return {
      beforeFiles: [
        // WP REST API
        {
          source: "/wp-json/:path*",
          destination: `${WP_ORIGIN}/wp-json/:path*`,
        },
        // WP Admin
        {
          source: "/wp-admin/:path*",
          destination: `${WP_ORIGIN}/wp-admin/:path*`,
        },
        // WP Login
        {
          source: "/wp-login.php",
          destination: `${WP_ORIGIN}/wp-login.php`,
        },
        // WP Content (uploads/images/plugins/themes assets)
        {
          source: "/wp-content/:path*",
          destination: `${WP_ORIGIN}/wp-content/:path*`,
        },
        // WP Includes (core JS/CSS)
        {
          source: "/wp-includes/:path*",
          destination: `${WP_ORIGIN}/wp-includes/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // Redirect old locale-prefixed URLs (/id/*, /en/*) to plain URLs.
  // The site is now single-language (Indonesian) without locale prefix.
  // Keeps Google-indexed URLs working after the locale removal.
  async redirects() {
    return [
      { source: "/id", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      // Old WP permalink format: /{slug}/ -> /berita/{slug}
      // Only catches slugs that don't match known Next.js routes or WP paths
    ];
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/((?!.*\\.pdf$).*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
