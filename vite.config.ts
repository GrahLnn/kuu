import { defineConfig } from "vite";
import dlight from "vite-plugin-dlight";

export default defineConfig({
  plugins: [dlight({ files: "**/*.{view,model}.ts" })],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
