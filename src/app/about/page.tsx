import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              This is a Next.js application with role-based authentication using NextAuth.js
              and MongoDB. The system supports two main user roles:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Role</h3>
                <p className="text-gray-600">
                  Administrators have full access to the dashboard and can manage
                  system settings, users, and all application features.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Role</h3>
                <p className="text-gray-600">
                  Marketing users have access to marketing tools, campaign management,
                  and analytics features specific to their role.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Next.js 16.0.8 with App Router</li>
              <li>NextAuth.js for authentication</li>
              <li>MongoDB with Mongoose ODM</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>bcryptjs for password hashing</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}