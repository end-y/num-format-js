import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.VITE_BASE_PATH ?? (repoName ? `/${repoName}/` : "/");

export default defineConfig({
  base,
  plugins: [wasm(), topLevelAwait()],
  server: {
    port: 8000,
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    exclude: ["num_format_js"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
