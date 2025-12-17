import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";
// import { Post } from "@/models/Post.model";
// import connectDB from "@/lib/db";
// import { revalidateAll } from "@/lib/test/revalidate";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await connectDB().then(() =>
      Post.create({
        title: body.title.trim(),
        content: body.content.trim(),
        published: body.published ?? true,
      })
    );

    // revalidateAll(); // Revalidate both posts and stats

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
