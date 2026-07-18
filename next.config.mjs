/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/drift-app",
  // Mocked product — no images from external hosts needed yet.
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
