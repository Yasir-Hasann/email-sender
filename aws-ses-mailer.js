// module imports
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const SES = new SESClient({ region: process.env.AWS_S3_REGION });

class SESMailer {
  async sendEmail(to, subject, text, html) {
    const msg = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
          Text: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: process.env.SMTP_EMAIL,
      ReplyToAddresses: [],
    };

    const sendEmailCommand = new SendEmailCommand(msg);

    try {
      await SES.send(sendEmailCommand);
    } catch (error) {
      console.error('Error sending email:', error);
      // if (error instanceof Error && error.name === 'MessageRejected') {
      //   return error;
      // }
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

    await this.sendEmail(email, 'Testing Email', 'This is the test Email', html);
  }
}

module.exports = new SESMailer();
