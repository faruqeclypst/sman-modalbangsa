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
    // In development, www.sman-modalbangsa.sch.id may resolve to a private IP
    // which Next.js Image blocks. Use unoptimized in dev to bypass this.
    unoptimized: process.env.NODE_ENV === "development",
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

  // Redirect old WordPress root-level slug URLs to Next.js locale-prefixed URLs.
  // This handles Google-indexed URLs like /ppdb-jalur-reguler-tahun/ -> /id/berita/ppdb-jalur-reguler-tahun
  async redirects() {
    return [
      // Old WP permalink format: /{slug}/ -> /id/berita/{slug}
      // Only catches slugs that don't match known Next.js routes or WP paths
    ];
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
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
