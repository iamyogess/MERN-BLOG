import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0", // Allows access from the network
    port: 5173, // Default Vite port (change if needed)
  },
});
