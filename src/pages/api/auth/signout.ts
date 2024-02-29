import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("Authorization", { path: "/" });
  cookies.delete("Type", { path: "/" });
  cookies.delete("User", { path: "/" });
  localStorage.clear();
  return redirect("/");
};