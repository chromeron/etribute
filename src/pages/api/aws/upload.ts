import { createPresignedPost } from "./signUrl";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {

    const formData = await request.formData();
    const contentType = formData.get("content-type");
    const key = formData.get("key");

    console.log("Key "+key+"  contentType: "+contentType);
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

export const GET: APIRoute = async ({ request }) => {
  try {
    
    
    return new Response(JSON.stringify({
      test: "test",
    }),
    { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err,
    }),
    { status: 500 });
  }
  
};