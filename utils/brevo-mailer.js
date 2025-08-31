// module imports
const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

class BrevoMailer {
  static instance = null;

  constructor() {
    this.brevoAPI = new TransactionalEmailsApi();
    this.brevoAPI.setApiKey(TransactionalEmailsApi.ApiKeys.apiKey, process.env.BREVO_API_KEY);
    // this.brevoAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;
  }

  async #sendEmail(to, subject, text = '', html) {
    const message = new SendSmtpEmail();
    message.sender = { name: 'My Website', email: process.env.SMTP_EMAIL };
    message.to = [{ email: to }];
    message.subject = subject;
    message.textContent = text;
    message.htmlContent = html;
    try {
      await this.brevoAPI.sendTransacEmail(message);
    } catch (err) {
      console.error('Brevo Error:', err?.response);
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
    if (!BrevoMailer.instance) {
      BrevoMailer.instance = new BrevoMailer();
    }
    return BrevoMailer.instance;
  }
}

module.exports = BrevoMailer.getInstance();
