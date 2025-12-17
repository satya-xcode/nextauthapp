"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function PostActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function deletePost() {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    startTransition(async () => {
      try {
        setError(null);
        const res = await fetch(`/api/test/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to delete post");
        }

        // Refresh the page to show updated data
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete post");
        console.error("Delete error:", err);
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={deletePost}
        disabled={isPending}
        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <div className="text-red-600 text-xs max-w-xs text-right">{error}</div>
      )}
    </div>
  );
}
