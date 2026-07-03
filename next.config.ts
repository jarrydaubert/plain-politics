import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        destination: "/glossary",
        permanent: false,
        source: "/glossary/left-wing"
      },
      {
        destination: "/glossary",
        permanent: false,
        source: "/glossary/right-wing"
      },
      {
        destination: "/glossary",
        permanent: false,
        source: "/glossary/centre-centrist"
      }
    ];
  },
  typedRoutes: true
};

export default nextConfig;
