import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: true,
  output: "standalone",
  env: {
    NEXTAUTH_URL: "https://main.d13koukf3fjuf0.amplifyapp.com",
    MONGODB_URI:
      "mongodb+srv://satyaxcode_db_user:WKkvu8lGUrDPkqsf@satyaxdb.jcixewm.mongodb.net/?appName=satyaxdb",
    AUTH_SECRET: "71fO2lkYpNaA1xq+/b98lpFLylzAbS++aPMH3rnBKYI=",
    NEXTAUTH_SECRET: "71fO2lkYpNaA1xq+/b98lpFLylzAbS++aPMH3rnBKYI=",
  },
};

export default nextConfig;
