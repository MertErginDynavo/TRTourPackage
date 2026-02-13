// Email and WhatsApp notification utilities
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email notification function
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 Email (dev mode):', { to, subject })
      return { success: true, mode: 'dev' }
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'TRTourPackage <noreply@trtourpackage.com>',
      to,
      subject,
      html,
    })

    console.log('✅ Email sent:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Email error:', error)
    return { success: false, error }
  }
}

// WhatsApp notification function (using WhatsApp Business API or Twilio)
export async function sendWhatsApp({
  to,
  message,
}: {
  to: string
  message: string
}) {
  try {
    // For now, just log. You can integrate Twilio or WhatsApp Business API later
    console.log('📱 WhatsApp (dev mode):', { to, message })
    
    // TODO: Integrate with Twilio or WhatsApp Business API
    // Example with Twilio:
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    // await client.messages.create({
    //   from: 'whatsapp:+14155238886',
    //   to: `whatsapp:${to}`,
    //   body: message
    // })

    return { success: true, mode: 'dev' }
  } catch (error) {
    console.error('❌ WhatsApp error:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  agencyApproved: (agencyName: string) => ({
    subject: '🎉 Your Agency Has Been Approved!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #27ae60;">✓ Agency Approved!</h1>
        <p>Dear ${agencyName},</p>
        <p>Great news! Your agency has been approved and verified on TRTourPackage.</p>
        <p>You can now:</p>
        <ul>
          <li>View travel requests from international travelers</li>
          <li>Submit tour offers</li>
          <li>Connect directly with travelers</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://trtourpackage.vercel.app'}/agency/login" style="background: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Login to Dashboard</a></p>
        <p>Best regards,<br>TRTourPackage Team</p>
      </div>
    `,
  }),

  agencyRejected: (agencyName: string, reason?: string) => ({
    subject: 'Agency Registration Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e53e3e;">Registration Update</h1>
        <p>Dear ${agencyName},</p>
        <p>Thank you for your interest in TRTourPackage.</p>
        <p>Unfortunately, we are unable to approve your agency registration at this time.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>If you have questions, please contact us at support@trtourpackage.com</p>
        <p>Best regards,<br>TRTourPackage Team</p>
      </div>
    `,
  }),

  newOfferToTraveler: (travelerName: string, agencyName: string, offerLink: string) => ({
    subject: '🎁 New Tour Offer Received!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4299e1;">New Tour Offer!</h1>
        <p>Hi ${travelerName},</p>
        <p><strong>${agencyName}</strong> has submitted a tour offer for your request.</p>
        <p><a href="${offerLink}" style="background: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Offer</a></p>
        <p>Best regards,<br>TRTourPackage Team</p>
      </div>
    `,
  }),

  newRequestToAgency: (agencyName: string, destination: string, travelDates: string) => ({
    subject: '🌍 New Travel Request Available',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #48bb78;">New Travel Request</h1>
        <p>Hi ${agencyName},</p>
        <p>A new travel request is available:</p>
        <ul>
          <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Dates:</strong> ${travelDates}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://trtourpackage.vercel.app'}/agency/dashboard" style="background: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Request</a></p>
        <p><strong>Remember:</strong> You have 24 hours to submit your offer.</p>
        <p>Best regards,<br>TRTourPackage Team</p>
      </div>
    `,
  }),
}

// Legacy functions for backward compatibility
export async function sendEmailNotification(
  to: string,
  subject: string,
  message: string,
  link: string
) {
  return sendEmail({
    to,
    subject,
    html: `<p>${message}</p><p><a href="${link}">Click here</a></p>`,
  })
}

export async function sendWhatsAppNotification(
  to: string,
  message: string,
  link: string
) {
  return sendWhatsApp({
    to,
    message: `${message}\n\n${link}`,
  })
}
