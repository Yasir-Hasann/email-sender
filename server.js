const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { sendMail } = require('./mailer');

const app = express();

const port = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/send', (req, res) => {
  sendMail(req.body.email, req.body.name);
  res.status(200).send({ status: 'Email Sent' });
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});









