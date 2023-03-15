/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/config/setup.ts",
    include: ["**/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  resolve: {
    alias: [
      { find: "src", replacement: resolve(__dirname, "./src") },
      { find: "tests", replacement: resolve(__dirname, "./tests") },
    ],
  },
});
