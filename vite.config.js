import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/claude": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/claude/, "/v1/messages"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Forward the auth headers from the original request
            const apiKey = req.headers["x-api-key"];
            if (apiKey) {
              proxyReq.setHeader("x-api-key", apiKey);
              proxyReq.setHeader("anthropic-version", "2023-06-01");
            }
          });
        },
      },
    },
  },
});
