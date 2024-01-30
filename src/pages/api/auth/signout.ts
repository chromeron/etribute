import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("Authorization", { path: "/" });
  return redirect("/inicio");
};