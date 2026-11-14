import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const BACKEND_DEVELOPMENT_URL = "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  server: {
    // Forwarding /api keeps the browser on one origin, so session cookies work without CORS.
    proxy: { "/api": BACKEND_DEVELOPMENT_URL },
  },
});
