// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"], // your public API
  format: ["esm"], // only ES modules
  dts: false, // emit .d.ts files
  splitting: true, // no code‑splitting for libs
  sourcemap: false,
  clean: true,
  treeshake: "recommended",
  onSuccess:
    process.env.NODE_ENV === "development" ? "node dist/server.js" : undefined,
  bundle: true,
});
