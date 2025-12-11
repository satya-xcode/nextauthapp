/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  session,
  children
}: {
  session:any
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}