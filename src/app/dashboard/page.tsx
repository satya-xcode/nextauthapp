"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/unauthorized");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-indigo-600">150</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Active Sessions
            </h3>
            <p className="text-3xl font-bold text-green-600">45</p>
            <p className="text-sm text-gray-500">Currently online</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              System Status
            </h3>
            <p className="text-3xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-500">All systems operational</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                Manage Users
              </button>
              <Link href={"/dashboard/post"}>
                <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  Manage Posts
                </button>
              </Link>
              <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                System Settings
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                View Reports
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                Security Logs
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm">New user registered</span>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm">System backup completed</span>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm">Security scan finished</span>
                <span className="text-xs text-gray-500">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
