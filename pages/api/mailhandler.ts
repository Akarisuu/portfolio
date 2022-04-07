import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).end();

  const data = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || undefined,
      secure: process.env.EMAIL_SECURE === "true" || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${data.name}, ${data.email}" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_RECIEVER}`,
      subject: `Wiadomość ze strony portfolio - "${data.topic}"`,
      text: data.message,
    });

    res.status(200).end();
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
}
