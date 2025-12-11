import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    hasSecret: !!(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
    hasMongoUri: !!process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  };

  return NextResponse.json(config);
}
