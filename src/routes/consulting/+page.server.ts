import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const company = formData.get('company')?.toString().trim() || 'Not provided';
    const message = formData.get('message')?.toString().trim();

    // Validation
    if (!name || !email || !message) {
      return fail(400, {
        error: 'Please fill in all required fields.',
        name,
        email,
        company,
        message
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, {
        error: 'Please enter a valid email address.',
        name,
        email,
        company,
        message
      });
    }

    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Consulting Form <onboarding@resend.dev>',
        to: 'me@aaronkantrowitz.com',
        replyTo: email,
        subject: `Consulting Inquiry from ${name}`,
        html: `
          <h2>New Consulting Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Consulting Inquiry

Name: ${name}
Email: ${email}
Company: ${company}

Message:
${message}
        `.trim()
      });

      return { success: true };
    } catch (err) {
      console.error('Failed to send email:', err);
      return fail(500, {
        error: 'Failed to send message. Please try again or email directly.',
        name,
        email,
        company,
        message
      });
    }
  }
};
