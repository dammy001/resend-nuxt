import { Resend } from 'resend'
import type { H3Event } from 'h3'
// @ts-expect-error exists
import { useRuntimeConfig } from '#imports'

/**
 * useServerResend is a utility function that initializes and returns a Resend instance
 * for server-side usage in Nuxt 3. It ensures that only one instance of Resend is created
 * per event context, avoiding unnecessary re-initializations.
 */
export const useServerResend = async (event: H3Event): Promise<Resend> => {
  const {
    resend: { key },
  } = useRuntimeConfig()

  // Return Resend's instance if already initialized in event context
  if (event.context._resend) return event.context._resend

  const resend = new Resend(key)

  // Store the initialized Resend instance in the event context for future use
  event.context._resend = resend

  return event.context._resend
}
