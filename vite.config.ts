import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import CloudflarePagesFunctions from "vite-plugin-cloudflare-functions";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // CloudflarePagesFunctions({
    //   wrangler: {
    //     port: 3333,
    //   },
    // }),
  ],
});
