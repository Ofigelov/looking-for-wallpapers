import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

// используем dotenv, чтобы получить доступ к process.env перед началом сборки
dotenv.config();

const PROXY_URL = process.env.PROXY_URL as string;

console.log(PROXY_URL);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "^/post/*": PROXY_URL,
    },
  },
});
