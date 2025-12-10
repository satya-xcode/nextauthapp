import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to NextAuth App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Role-based authentication system with Admin and Marketing roles
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Admin Access</h2>
              <p className="text-gray-600 mb-4">
                Admin users can access the dashboard with full system controls.
              </p>
              <div className="text-sm text-gray-500">
                Role: admin
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Marketing Access</h2>
              <p className="text-gray-600 mb-4">
                Marketing users can access marketing tools and campaigns.
              </p>
              <div className="text-sm text-gray-500">
                Role: marketing
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
