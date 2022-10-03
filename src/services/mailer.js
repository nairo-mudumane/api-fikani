const nodemailer = require("nodemailer");

async function sendMailWithNoHTML(to, subject, text, cc, alternativeFrom) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    secureConnection: false,
    port: process.env.MAIL_PORT,
    // secure: true,
    // tls: {
    //   ciphers: process.env.CIPHERS,
    // },
    auth: {
      user: process.env.MAIL_USER,
      pass: `#${process.env.MAIL_PASS}`,
    },
  });

  const mailOptions = {
    from: alternativeFrom || `OneMedia, SA <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
    cc,
  };

  return await transporter.sendMail(mailOptions);
}

async function sendMailWithHTML(to, subject, html, cc, alternativeFrom) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    secureConnection: false,
    port: process.env.MAIL_PORT,
    // secure: true,
    // tls: {
    //   ciphers: process.env.CIPHERS,
    // },
    auth: {
      user: process.env.MAIL_USER,
      pass: `#${process.env.MAIL_PASS}`,
    },
  });

  const mailOptions = {
    from: alternativeFrom || `OneMedia, SA <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
    cc,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = {
  sendMailWithNoHTML,
  sendMailWithHTML,
};
