/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3ojjhidhvmemezjc.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
