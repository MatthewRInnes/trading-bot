import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Vite configuration for development and production
 * Configures server settings, plugins, and module resolution
 */
export default defineConfig(({ mode }) => ({
  // Development server configuration
  server: {
    host: "::",  // Listen on all network interfaces
    port: 8080,  // Development server port
  },
  // Plugin configuration
  plugins: [
    react(),  // React with SWC for faster compilation
  ].filter(Boolean),
  // Module resolution settings
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Path alias for src directory
    },
  },
}));
