import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "spn-sta.spinny.com",
      },
      {
        protocol: "https",
      hostname: "uzosrbdqiqoaaklrqxwl.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.openai.com",
      },
      {
        protocol: "https",
        hostname: "**.toiimg.com",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
      },
      {
        protocol: "https",
        hostname: "www.adotrip.com",
      },
      {
        protocol: "https",
        hostname: "www.revv.co.in",
      },
    ],
    domains: ['res.cloudinary.com']
}
  
};

export default nextConfig;
