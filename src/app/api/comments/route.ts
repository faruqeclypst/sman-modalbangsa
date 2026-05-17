import { NextRequest, NextResponse } from "next/server";
import { WP_API_URL } from "@/lib/wp";

/**
 * Proxy for WordPress comments API.
 * WordPress REST API requires authentication for posting comments.
 * 
 * Setup: In WordPress admin, go to Users → Your Profile → Application Passwords
 * Create one and set WP_APP_USER and WP_APP_PASSWORD in .env
 * 
 * If no credentials are set, comments will be stored locally (placeholder).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { post, author_name, author_email, content } = body;

    if (!post || !author_name || !content) {
      return NextResponse.json(
        { error: "Missing required fields: post, author_name, content" },
        { status: 400 },
      );
    }

    const wpUser = process.env.WP_APP_USER;
    const wpPass = process.env.WP_APP_PASSWORD;

    // Build auth header if credentials available
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "SMAN-ModalBangsa-NextJS/1.0",
    };

    if (wpUser && wpPass) {
      headers["Authorization"] = `Basic ${Buffer.from(`${wpUser}:${wpPass}`).toString("base64")}`;
    }

    const res = await fetch(`${WP_API_URL}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        post: Number(post),
        author_name,
        author_email: author_email || "anonymous@visitor.com",
        content,
        // If authenticated, we can set status directly
        ...(wpUser ? { status: "hold" } : {}),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[api/comments] WP error:", res.status, errorText);
      
      // WordPress returns 409 if comments are closed for this post
      if (res.status === 409) {
        return NextResponse.json(
          { error: "Comments are closed for this post" },
          { status: 409 },
        );
      }
      
      return NextResponse.json(
        { error: "Failed to submit comment", status: res.status, detail: errorText },
        { status: res.status },
      );
    }

    const comment = await res.json();
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("[api/comments] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
