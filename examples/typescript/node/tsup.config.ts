import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/server.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: "recommended",
    format: ["esm"],
    bundle: true,
    onSuccess: 'node dist/server.js',
})