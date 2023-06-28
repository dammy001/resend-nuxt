import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'
import { useServerResend } from '#resend/server'

export default defineEventHandler(async (event: H3Event) => {
  const resend = await useServerResend(event)

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Welcome',
      html: '<strong>We are pleased to have you!</strong>',
    })

    return data
  } catch (error) {
    return error
  }
})
