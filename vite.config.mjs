import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        page: resolve(__dirname, "src/page/index.html"),
        character: resolve(__dirname, "src/character/index.html"),
        movies: resolve(__dirname, "src/movies/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html")
      },
    },
  },
});
