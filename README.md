# Nuxt Module For Resend

This Nuxt module provides an easy way to integrate Resend in your Nuxt application, on the server side. It utilizes the official Resend package for server-side usage.

## Installation

1. Add `resend-nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D resend-nuxt

# Using yarn
yarn add --dev resend-nuxt

# Using npm
npm i -D resend-nuxt
```

2. Add `resend-nuxt` to your modules in `nuxt.config`

```ts
import resendNuxtModule from 'resend-nuxt'

export default defineNuxtConfig({
  modules: [resendNuxtModule],
})
```

## Configuration

Resend key can be added to the .env file

```bash
RESEND_API_KEY='your_key'
```

Additionally, you can the key in your `nuxt.config`:

```ts
import resendNuxtModule from 'resend-nuxt'

export default defineNuxtConfig({
  modules: [resendNuxtModule],
  resend: {
    key: 'your_key',
  },
})
```

## Usage

The module provides a useResend function to create a Resend instance on the server side. This instance can be used to interact with the Resend APIs.

Example:

```ts
import { defineEventHandler } from 'h3'
import { useResend } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const resend = await useResend(event)

  try {
    return resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Welcome',
      html: '<strong>We are pleased to have you!</strong>',
    })
  } catch (error) {
    return error
  }
})
```

## Local Development

To contribute to this package, you need to set up a local environment.

1. Clone this repository

```bash
# Install dependencies
pnpm i

# Generate type stubs
pnpm dev:prepare

# Build
pnpm build

# Lint
pnpm lint:fix
```
