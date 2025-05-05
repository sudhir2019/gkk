import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";
import path from "path"; // ✅ Ensure path is imported


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['fs'],
      output: {
        manualChunks(id) {
          // Split dependencies into separate chunks
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      },

    }
  },
  css: {
    devSourcemap: false, // Disable source maps in development
  },
  define: {
    "global.browser": "{}",
  },
  server: {
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

    },
  }, // ✅ Correctly closed resolve block
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  optimizeDeps: {
    include: ['jquery'],
  },
});
