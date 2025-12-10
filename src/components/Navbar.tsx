"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-800">
              NextAuth App
            </Link>
            
            {/* Public Links */}
            <div className="hidden md:flex space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div>Loading...</div>
            ) : session ? (
              <>
                {/* Role-based Navigation */}
                {session.user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                )}
                
                {session.user.role === "marketing" && (
                  <Link
                    href="/marketting"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Marketing
                  </Link>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {session.user.name} ({session.user.role})
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}