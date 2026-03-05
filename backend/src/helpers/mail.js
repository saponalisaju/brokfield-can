const nodemailer = require("nodemailer");
const logger = require("../controllers/loggerController");
const { smtpEmail, smtpPass } = require("../../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpEmail || "australiaamig@gmail.com",
    pass: smtpPass,
  },
});

const sendEmail = async (userEmail, userName, subject, message) => {
  try {
    const mailOption = {
      from: '"No Reply" <no-reply@australiaworksvisas.com>',
      to: userEmail,
      subject: subject,
      text: `Dear ${userName},\n\n${message}\n\nBest regards. Click here https://canadapermitvisa.com for more updates`,
    };
    const info = await transporter.sendMail(mailOption);
    logger.log("info", "message sent: %s", info.response);
  } catch (error) {
    logger.log("error", "Error occurred with sending email: ", error);
    throw error;
  }
};

const sendEmailApplicationApproved = async (userEmail, userName) => {
  const subject = "Application Approved";
  const message =
    "For any further assistance, do not hesitate to contact us; we will be happy to serve you.";
  await sendEmail(userEmail, userName, subject, message);
};
const sendEmailJobLetter = async (userEmail, userName) => {
  const subject = "Application Pending";
  const message = "A step in your immigration process has been upgraded.";
  await sendEmail(userEmail, userName, subject, message);
};

module.exports = {
  sendEmailApplicationApproved,
  sendEmailJobLetter,
};
