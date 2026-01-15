import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 20049,
      host: true,
      allowedHosts: env.VITE_ALLOWED_HOSTS
        ? env.VITE_ALLOWED_HOSTS.split(",").map(h => h.trim())
        : [],

      proxy: {
        "/api/presence": {
          target: "http://vn1.whitecat.cloud:20046",
          changeOrigin: true,
          rewrite: (path) => {
            const match = path.match(/^\/api\/presence\?id=(.+)$/);
            return match ? `/api/presence/${match[1]}` : path;
          }
        },
      
        "/api": {
          target: "http://vn1.whitecat.cloud:20046",
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, "")
        }
      }
    }
  };
});
