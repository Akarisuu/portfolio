import { ContactFormSchema } from 'components/home/contact/components/form/Form.schemas';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(400).end();

  try {
    const rawParse = ContactFormSchema.safeParse(req.body);

    if (!rawParse.success) {
      return res.status(400).json({
        message: 'Invalid data',
        errors: rawParse.error,
      });
    }

    const { email, message, name, topic } = rawParse.data;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || undefined,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}, ${email}" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_RECIEVER}`,
      subject: `Wiadomość ze strony portfolio - "${topic}"`,
      text: message,
    });

    res.status(200).end();
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
}
