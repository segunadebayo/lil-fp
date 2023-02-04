import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  clean: true,
  entry: ['src'],
  minifySyntax: true,
  format: ['esm', 'cjs'],
})
