import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cMapsDir = path.join(
  path.dirname(require.resolve("pdfjs-dist/package.json")),
  "cmaps"
);
const standardFontsDir = path.join(
  path.dirname(require.resolve("pdfjs-dist/package.json")),
  "standard_fonts"
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
