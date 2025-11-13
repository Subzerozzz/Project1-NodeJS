const nodemailer = require("nodemailer");

const sendMail = (email, subject, content) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: subject,
    text: content,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

module.exports = sendMail;
