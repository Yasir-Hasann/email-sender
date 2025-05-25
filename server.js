// module imports
const cors = require('cors');
require('dotenv').config();
const express = require('express');

// file imports
const nodemailer = require('./nodemailer');
const sendgridMailer = require('./sendgrid-mailer');
const sesMailer = require('./aws-ses-mailer');

// variable initializations
const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.post('/send', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) throw new Error('Please provide an email and a name');

  await nodemailer.sendTestEmail(email, name);
  await sendgridMailer.sendTestEmail(email, name);
  await sesMailer.sendTestEmail(email, name);
  res.status(200).json({ status: 'Email Sent' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
