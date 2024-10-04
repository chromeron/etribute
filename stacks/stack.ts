import { AstroSite, type StackContext } from "sst/constructs";

export default function MyStack({ stack }: StackContext) {
  // ... existing constructs

  // Create the Astro site
  const site = new AstroSite(stack, "Site", {
    path: "etribute/",
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url,
  });
}