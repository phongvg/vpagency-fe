import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // UI libraries
          "ui-vendor": [
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],

          // Data & State Management
          "data-vendor": ["@tanstack/react-query", "@tanstack/react-table", "axios"],

          // Charts & Visualization
          "chart-vendor": ["recharts"],

          // Form libraries
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "react-select", "react-select-async-paginate"],

          // Utilities
          "utils-vendor": ["date-fns", "jwt-decode", "clsx", "class-variance-authority", "tailwind-merge", "lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
