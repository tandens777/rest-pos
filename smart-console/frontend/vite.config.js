import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: true,
    port: 3000, // Change the port to 3000
    host: 'localhost', // Optionally specify a host

    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
