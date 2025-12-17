/* eslint-disable @typescript-eslint/no-explicit-any */

// import { headers } from "next/headers";
import { cacheTag, cacheLife } from "next/cache";
import Link from "next/link";
import { PostActions } from "./components/PostActions";

async function getPosts() {
  "use cache";
  cacheTag("posts");
  cacheLife("minutes"); // Cache for 5 minutes

  // const headersList = await headers();
  // const host = headersList.get("host") || "localhost:3000";
  // const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  console.log("🔄 Fetching posts from API...");

  const res = await fetch(`http://localhost:3000/api/post`);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log("✅ Posts fetched successfully");
  return data;
}

async function getPostsCount() {
  "use cache";
  cacheTag("posts", "stats");
  cacheLife("hours"); // Cache for 1 hour

  const posts = await getPosts();
  return posts.length;
}

async function getRecentPosts() {
  "use cache";
  cacheTag("posts", "recent");
  cacheLife("seconds"); // Cache for 30 seconds - very short for demo

  const posts = await getPosts();
  return posts.slice(0, 3); // Only return first 3 posts
}

async function getCacheInfo() {
  "use cache";
  cacheTag("cache-info");
  cacheLife("max"); // Cache indefinitely until manually revalidated

  return {
    timestamp: new Date().toISOString(),
    cacheStrategies: [
      { name: "Posts", lifetime: "5 minutes", tags: ["posts"] },
      { name: "Stats", lifetime: "1 hour", tags: ["posts", "stats"] },
      { name: "Recent", lifetime: "30 seconds", tags: ["posts", "recent"] },
      { name: "Cache Info", lifetime: "indefinite", tags: ["cache-info"] },
    ],
  };
}

export const metadata = {
  title: "Next.js 16 Caching Demo - Test Posts",
  description: "Testing server-side caching with cacheTag and cacheLife APIs",
};

export default async function TestPage() {
  let posts = [];
  let postsCount = 0;
  let recentPosts = [];
  let cacheInfo = null;
  let error = null;

  try {
    // These will be cached separately with different cache lifetimes
    [posts, postsCount, recentPosts, cacheInfo] = await Promise.all([
      getPosts(),
      getPostsCount(),
      getRecentPosts(),
      getCacheInfo(),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load posts";
    console.error("Error loading posts:", err);
  }

  const currentTime = new Date().toLocaleString();

  return (
    <section className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Next.js 16 Caching Demo
        </h1>
        <p className="text-gray-600 mt-2">
          Testing server-side caching with{" "}
          <code className="bg-gray-100 px-1 rounded">cacheTag</code> and{" "}
          <code className="bg-gray-100 px-1 rounded">cacheLife</code>
        </p>
        <div className="text-sm text-gray-500 mt-2">
          Page rendered at: {currentTime}
        </div>
      </div>

      {/* Cache Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-3">
          🔄 Next.js 16 Caching Strategy
        </h3>
        {cacheInfo && (
          <div className="space-y-3">
            <div className="text-xs text-yellow-700 mb-2">
              Cache info generated at:{" "}
              {new Date(cacheInfo.timestamp).toLocaleString()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cacheInfo.cacheStrategies.map((strategy, index) => (
                <div key={index} className="bg-yellow-100 p-3 rounded text-sm">
                  <div className="font-medium text-yellow-900">
                    {strategy.name}
                  </div>
                  <div className="text-yellow-700">
                    Lifetime: {strategy.lifetime}
                  </div>
                  <div className="text-yellow-600 text-xs">
                    Tags: {strategy.tags.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Posts Preview */}
      {recentPosts && recentPosts.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">
            🚀 Recent Posts (30s cache)
          </h3>
          <div className="text-sm text-green-800 space-y-1">
            {recentPosts.map((post: any, index: number) => (
              <div key={post._id} className="truncate">
                {index + 1}. {post.title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <Link href={"post/new"}>
          <h2 className="font-semibold text-blue-900 mb-2">Add New Post</h2>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Posts ({postsCount})</h2>
          <div className="text-sm text-gray-500">
            {posts.length > 0 && <span>Showing {posts.length} posts</span>}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {posts.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            No posts found. Add your first post above!
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <PostActions id={post._id} />
              </div>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <div className="text-sm text-gray-500">
                Created: {new Date(post.createdAt).toLocaleString()}
                {post.updatedAt !== post.createdAt && (
                  <span className="ml-4">
                    Updated: {new Date(post.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
