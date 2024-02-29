import { defineConfig } from "astro/config";
import aws from "astro-sst";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: false
  },
  output: "server",
  adapter: aws({
    serverRoutes: [
      "api/*"     // Directory of API endpoints which require all methods
    ]
  }),
  integrations: [react(), tailwind()]
});