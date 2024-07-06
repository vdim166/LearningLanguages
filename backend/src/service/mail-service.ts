import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Activate your account " + process.env.API_URL,
      text: "",
      html: `
        <div>
          <h1>Activate your account</h1>
          <a href="${link}">${link}</a>
        </div>

      `,
    })
  }
}

const mailService = new MailService()
export default mailService
