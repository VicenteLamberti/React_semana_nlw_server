import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"; 

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "010194caa76e2a",
      pass: "63f1cc684aaa82"
    }
  });
export class NodemailerMailAdapter implements MailAdapter{
    async sendEmail({subject, body}: SendMailData) {
  await transport.sendMail({
        from:"Equipe feedget <oi@feed.com>",
        to:"Vicente <vicente.lamberti@apte.com.br",
        subject: subject,
        html:body
    })
    };
}