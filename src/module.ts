import { fileURLToPath } from 'node:url'
import {
  addTemplate,
  createResolver,
  defineNuxtModule,
  resolveModule,
  useLogger,
} from '@nuxt/kit'
import defu from 'defu'

export interface ModuleOptions {
  key?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'resend-nuxt',
    configKey: 'resend',
    compatibility: {
      nuxt: '>=3',
    },
  },
  defaults: () => ({
    key: process.env.RESEND_API_KEY as string,
  }),
  setup: (options, nuxt) => {
    useLogger('Resend Nuxt')

    const { resolve } = createResolver(import.meta.url)

    // Make sure the server key is set
    if (!options.key) {
      throw new Error('Missing Resend API key.')
    }

    nuxt.options.runtimeConfig.stripe = defu(
      nuxt.options.runtimeConfig.resend,
      {
        key: options.key,
      },
    )

    // Inject options via virtual template
    nuxt.options.alias['#resend-nuxt-options'] = addTemplate({
      filename: 'resend-options.mjs',
      getContents: () =>
        Object.entries(options)
          .map(
            ([key, value]) =>
              `export const ${key} = ${JSON.stringify(value, null, 2)}
      `,
          )
          .join('\n'),
    }).dst

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(
        typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {},
        {
          inline: [resolve('./runtime')],
        },
      )

      nitroConfig.alias['#resend/server'] = resolveModule('./server/index', {
        paths: resolve('./runtime'),
      })
    })

    nuxt.hook('prepare:types', (options) => {
      options.tsConfig.compilerOptions.paths['#resend/server'] = [
        resolveModule('./server/index', { paths: resolve('./runtime') }),
      ]
    })
  },
})
