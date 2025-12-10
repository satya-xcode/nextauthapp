"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function MarketingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    
    if (session.user.role !== "marketing") {
      router.push("/unauthorized");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || session.user.role !== "marketing") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {session.user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaigns</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500">Active campaigns</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Leads</h3>
            <p className="text-3xl font-bold text-green-600">284</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion</h3>
            <p className="text-3xl font-bold text-purple-600">18.5%</p>
            <p className="text-sm text-gray-500">+2.3% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-orange-600">$45.2K</p>
            <p className="text-sm text-gray-500">Generated this month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Management</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Create New Campaign
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Email Marketing
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Social Media Posts
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Analytics & Reports
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                <div>
                  <span className="text-sm font-medium">Summer Sale 2024</span>
                  <p className="text-xs text-gray-500">Email Campaign</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
                <div>
                  <span className="text-sm font-medium">Product Launch</span>
                  <p className="text-xs text-gray-500">Social Media</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="text-sm font-medium">Newsletter Q4</span>
                  <p className="text-xs text-gray-500">Email Campaign</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}