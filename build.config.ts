import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    { input: 'src/module', format: 'esm' },
    { input: 'src/runtime/', outDir: 'dist/runtime' },
  ],
  externals: ['nuxt', '@nuxt/schema', '@nuxt/kit', 'vite'],
  rollup: {
    inlineDependencies: true,
  },
})
