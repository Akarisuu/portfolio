import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  console.log(data);

  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${data.name}" <${data.email}>`,
      to: `${process.env.EMAIL}`,
      subject: `Wiadomość ze strony portfolio - "${data.topic}"`,
      text: data.message,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).end();
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
}
