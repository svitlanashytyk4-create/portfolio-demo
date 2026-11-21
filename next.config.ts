import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Storybook збирається в public/storybook. Next не віддає index.html для адреси теки,
  // тому /storybook веде на /storybook/index.html (відносні шляхи Storybook працюють лише звідти).
  redirects() {
    return [{ source: "/storybook", destination: "/storybook/index.html", permanent: false }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
