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

async function sendMailWithHTML(
  email,
  password,
  serviceName,
  replayTo,
  to,
  subject,
  html,
  cc
) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: true, //ssl
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: `${serviceName} <${email}>`,
    replayTo: replayTo ? replayTo : `noreplay.${email}`,
    to,
    subject,
    html,
    cc,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

module.exports = {
  sendMailWithNoHTML,
  sendMailWithHTML,
};
