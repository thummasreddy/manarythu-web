/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.manarythu.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async rewrites() {
    // Proxy /api/v1/* to the backend during local development so the browser
    // talks to the same origin (avoids CORS friction and simplifies SSR).
    const api = process.env.MANARYTHU_API_URL ?? "http://localhost:8081";
    return [
      { source: "/api/:path*", destination: `${api}/api/:path*` },
    ];
  },
};

export default nextConfig;
