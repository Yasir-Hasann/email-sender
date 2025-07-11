// module imports
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SendGridMailer {
  static instance = null;

  async #sendEmail(to, subject, text, html) {
    const msg = {
      from: `No reply <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
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

    await this.#sendEmail(email, 'Testing Email', 'This is the test Email', html);
  }

  static getInstance() {
    if (!SendGridMailer.instance) {
      SendGridMailer.instance = new SendGridMailer();
    }
    return SendGridMailer.instance;
  }
}

module.exports = SendGridMailer.getInstance();
