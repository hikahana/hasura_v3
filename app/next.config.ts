import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    WS_API_URL: process.env.WS_API_URL,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
};

export default nextConfig;
