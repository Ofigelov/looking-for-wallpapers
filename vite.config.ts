import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

// используем dotenv, чтобы получить доступ к process.env перед началом сборки
dotenv.config();

const KONA_PROXY_URL = process.env.KONA_PROXY_URL as string;
const RULE_PROXY_URL = process.env.RULE_PROXY_URL as string;

console.log(KONA_PROXY_URL, RULE_PROXY_URL);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "^/post/*": KONA_PROXY_URL,
      "^/index.php": RULE_PROXY_URL,
    },
  },
});
