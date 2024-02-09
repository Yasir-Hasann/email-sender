const nodemailer = require('nodemailer');

const sendEmail = (email, html, subject) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    html,
    subject,
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (response) return true;
    return console.error('Error sending email:', error);
  });
};

exports.sendMail = (email, name) => {
  let html = `<!DOCTYPE html>
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
  </html>`
  sendEmail(email, html, 'Subject');
};
