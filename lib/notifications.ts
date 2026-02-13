// Notification helper functions

export async function sendEmailNotification(
  to: string,
  subject: string,
  message: string,
  link: string
) {
  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  console.log('📧 Email Notification:')
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Message: ${message}`)
  console.log(`Link: ${link}`)
  
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'noreply@trtourpackage.com',
  //   to,
  //   subject,
  //   html: `<p>${message}</p><p><a href="${link}">View Offers</a></p>`
  // })
}

export async function sendWhatsAppNotification(
  to: string,
  message: string,
  link: string
) {
  // TODO: Integrate with WhatsApp Business API or Twilio
  console.log('📱 WhatsApp Notification:')
  console.log(`To: ${to}`)
  console.log(`Message: ${message}`)
  console.log(`Link: ${link}`)
  
  // Example with Twilio:
  // const client = twilio(accountSid, authToken)
  // await client.messages.create({
  //   from: 'whatsapp:+14155238886',
  //   to: `whatsapp:${to}`,
  //   body: `${message}\n\n${link}`
  // })
}
