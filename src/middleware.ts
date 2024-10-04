import { defineMiddleware } from "astro/middleware";

const ALLOWED_PATHS = ["/api/auth/signin","/","/registro","/faqs", "/contacto"];

export const onRequest = defineMiddleware(({ url, cookies, redirect}, next)=> {
    // If present, this will have the form: "Basic <credential>"
  const basicAuth = cookies.get("Authorization")?.value;

  if (basicAuth) {
    if(url.pathname === "/") return redirect("/home", 302)
    
    return next();
  }

  /**
   * The middleware runs every time a page or endpoint is about to be rendered.
   * Only redirect if this is not in the home page
   */
  if ( ALLOWED_PATHS.includes(url.pathname)) {
        return next();
    }else{
        //Construct a full URL by passing `context.url` as the base URL
        // return Response.redirect(new URL("/", context.url), 302);
         return redirect("/", 302);
    }
    
});
