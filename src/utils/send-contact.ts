import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContact = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {

    const {
      name,
      phone,
      email,
      project,
      message
    } = data;

    await resend.emails.send({
      from: "onboarding@resend.dev",

      to: [
        "synclifysolutions@gmail.com"
      ],

      subject: `New enquiry from ${name}`,

      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Project:</strong> ${project}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `
    });

    return {
      success: true
    };

  });