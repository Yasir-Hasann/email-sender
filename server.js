// module imports
require('dotenv').config();
const cors = require('cors');
const express = require('express');

// file imports
const nodemailer = require('./utils/nodemailer');
const sendridMailer = require('./utils/sendgrid-mailer');
const sesMailer = require('./utils/aws-ses-mailer');
const brevoMailer = require('./utils/brevo-mailer');

// variable initializations
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post('/send', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) throw new Error('Email and Name are required!');

  await nodemailer.sendTestEmail(email, 'name');
  await sendgridMailer.sendTestEmail(email, name);
  await sesMailer.sendTestEmail(email, name);
  await brevoMailer.sendTestEmail(email, name);
  res.status(200).json({ success: true, message: 'Email has been sent! ' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
