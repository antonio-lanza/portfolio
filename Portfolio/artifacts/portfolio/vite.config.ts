import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// Load .env.local and .env files manually
[".env.local", ".env"].forEach((envFile) => {
  const envPath = path.resolve(import.meta.dirname, envFile);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      line = line.trim();
      if (line && !line.startsWith("#")) {
        const match = line.match(/^(.+?)=(.*)$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = match[2];
        }
      }
    });
  }
});

const rawPort = process.env.PORT ?? "3005";

if (!process.env.PORT) {
  process.env.PORT = rawPort;
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

if (!process.env.BASE_PATH) {
  process.env.BASE_PATH = basePath;
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  css: {
    postcss: {},
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
