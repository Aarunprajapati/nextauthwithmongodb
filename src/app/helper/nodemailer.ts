import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";

interface emailProps {
  email: string;
  emailType: string;
  userId: any;
}

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
     
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d2600d7e9a64bc",
        pass: "19b651455e7b50",
      },
    });
    const mailOptions = {
      from: "lovearun010@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
         </p>`,
    };

    const sendmail = await transport.sendMail(mailOptions);
    return sendmail;
  } catch (error: any) {
    console.log(error.message);
  }
};
