import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'
import { useResend } from '#resend/server'

export default defineEventHandler(async (event: H3Event) => {
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
