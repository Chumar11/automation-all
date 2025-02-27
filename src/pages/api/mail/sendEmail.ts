import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import corsMiddleware from "@/src/utils/corsMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await corsMiddleware(req, res);

  if (req.method === "POST") {
    const { to, subject, text, phone,email,script } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "majidabid017@gmail.com",
          pass: "shbt sbvj risk svxz",
        },
      });

      const mailOptions = {
        from: "majidabid017@gmail.com",
        to,
        phone,
        subject,
        text,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
