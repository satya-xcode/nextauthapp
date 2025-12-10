import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin routes - only admin can access
    if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Marketing routes - only marketing role can access
    if (pathname.startsWith("/marketting") && token?.role !== "marketing") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (
          pathname === "/" ||
          pathname === "/about" ||
          pathname === "/contact" ||
          pathname.startsWith("/auth/")
        ) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/marketting/:path*",
    "/api/admin/:path*",
    "/api/marketing/:path*",
  ],
};
