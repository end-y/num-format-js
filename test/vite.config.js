import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
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
});
