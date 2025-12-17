"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required");
      return;
    }

    startTransition(async () => {
      try {
        setError(null);
        setSuccess(false);

        const res = await fetch("http://localhost:3000/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to create post");
        }

        setTitle("");
        setContent("");
        setSuccess(true);

        // Refresh the page to show the new post
        router.back();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create post");
        console.error("Create post error:", err);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-blue-800">
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          rows={4}
          className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          required
          disabled={isPending}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
          Post created successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !title.trim() || !content.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors w-full"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
