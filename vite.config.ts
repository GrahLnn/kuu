import { defineConfig } from "vite";
import dlight from "vite-plugin-dlight";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    dlight({ files: "**/*.{view,model}.ts" }),
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: "src/mod/pdf.worker.mjs",
          dest: "assets",
        },
      ],
    }),
  ],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // 将限制提高到 1000 KB
  },
});
