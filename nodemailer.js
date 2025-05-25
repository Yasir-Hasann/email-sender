// module imports
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

class NodeMailer {
  static instance = null;
  constructor() {
    this.transporter = transporter;
  }

  async sendEmail(email, html, subject) {
    try {
      await this.transporter.sendMail({ from: `No reply <${process.env.SMTP_EMAIL}>`, to: email, html, subject });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendTestEmail(email, name) {
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
      <div>
          <h1>Hi, ${name}</h1>
          <p>Welcome to our services.</p>
      </div>
  </body>
  </html>`;

    await this.sendEmail(email, html, 'Testing Email');
  }
}

module.exports = new NodeMailer();
