import type { APIRoute } from "astro";
//import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email);
  if (!email || !password) {
    console.log("Entra");
    return new Response(JSON.stringify({
      message: "Missing required fields",
    }),
    { status: 400 });
  }
  
  console.log(`${email} y contraseña es ${password}`);
  const access_token= btoa(email+":"+password);
  console.log(access_token);
  cookies.set("Authorization", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });
  //return redirect("/dashboard");

  //Enviar datos al endpoint 
  return new Response(JSON.stringify({
    message: "Missing required fields",
  }),
  { status: 200 });
};