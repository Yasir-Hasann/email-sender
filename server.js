// module imports
const cors = require('cors');
require('dotenv').config();
const express = require('express');

// file imports
const { sendMail } = require('./mailer');

// variable initializations
const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.post('/send', (req, res) => {
  sendMail(req.body.email, req.body.name);
  res.status(200).json({ status: 'Email Sent' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
