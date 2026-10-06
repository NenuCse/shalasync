import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Performance optimizations ─────────────────────────────
  experimental: {
    // Optimise package imports — avoids importing entire lucide-react tree
    optimizePackageImports: ['lucide-react', '@supabase/ssr', '@supabase/supabase-js'],
  },

  // ── Image optimization ────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
    ],
    // Serve images in modern formats (WebP/AVIF) for smaller sizes
    formats: ['image/avif', 'image/webp'],
  },

  // ── HTTP security headers ────────────────────────────────
  // Note: Vercel automatically sets Cache-Control on /_next/static
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      // Cache public assets (logo, manifest) for 1 day
      source: '/(logo\\.jpg|manifest\\.json|favicon\\.ico)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' }],
    },
  ],

};

export default nextConfig;
