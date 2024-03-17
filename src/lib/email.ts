import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  // Replace with SMTP credentials
  const smtpOptions = {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || ""),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  }

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  })

  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Welcome to NextAPI",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  })
};