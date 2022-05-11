import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "44bed3f3cbc78c",
      pass: "5944869f1a8fad"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: "Feedback User <user.feedback@gamil.com>",
            to: "Squad NLW <adr.silva@nlwsquad.com>",
            subject,
            html: body
        });
    }
}