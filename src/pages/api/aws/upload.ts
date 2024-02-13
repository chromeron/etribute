import { createPresignedPost } from "./signUrl";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const formData = await request.formData();
    const contentType = formData.get("content-type");
    const key = formData.get("key");

    const data = await createPresignedPost({ key, contentType });
    return new Response(JSON.stringify({
      uploadUrl: data,
    }),
    { status: 200 });
  } catch (err) {
    console.error("Error in POST /upload", err);
    return new Response(JSON.stringify({
      error: err,
    }),
    { status: 500 });
  }
  
};