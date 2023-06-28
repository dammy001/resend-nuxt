import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'
import resendNuxtModule from '../src/module'

export default defineNuxtConfig({
  modules: [resendNuxtModule],
  resend: {
    key: 'resend_key',
  },
  nitro: {
    rootDir: resolve(__dirname, '.'),
  },
})
