import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      ".lovable.app",
      ".lovableproject.com",
      ".vercel.app",
      ".netlify.app",
      "localhost",
      "127.0.0.1",
    ],
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      ".lovable.app",
      ".lovableproject.com",
      ".vercel.app",
      ".netlify.app",
      "localhost",
      "127.0.0.1",
    ],
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});