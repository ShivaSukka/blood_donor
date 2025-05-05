const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivas1898@gmail.com',
    pass: 'tfmcdidpwynpjhrh'  // ✅ App password (remove spaces if copied with them)
  }
});

// Handle form submission
app.post('/submit-donor-form', (req, res) => {
  const { name, age, weight, bloodGroup } = req.body;

  const mailOptions = {
    from: 'shivas1898@gmail.com',
    to: ['shivas1898@gmail.com', 'sheshu4040@gmail.com'],  // multiple recipients
    subject: 'New Blood Donor Submitted',
    text: `Donor Info:\n\nName: ${name}\nAge: ${age}\nWeight: ${weight} kg\nBlood Group: ${bloodGroup}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.send('Failed to send email. Please try again.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send(`<h2>Thank you, ${name}! Your info has been emailed successfully.</h2>`);
    }
  });
});

// ✅ Start server OUTSIDE the route handler
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
