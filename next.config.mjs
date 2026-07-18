/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // Mocked product — no images from external hosts needed yet.
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
