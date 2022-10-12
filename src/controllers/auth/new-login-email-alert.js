const path = require("path");
const mailer = require("../../services/mailer");
const { getEmailTemplate } = require("../../services/get-email-template");

async function newLoginEmailAlert(type, data) {
  const email = process.env.INFO_EMAIL;
  const password = "#O" + process.env.INFO_EMAIL_PASSWORD.toString();

  if (type === "user") {
    const html_data = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      device: { ...data.device },
    };
    const ejs_file = path.resolve(
      "src/email-templates/user-new-device-login/user-new-device-login.ejs"
    );
    const html_file = await getEmailTemplate(ejs_file, html_data);

    return await mailer.sendMailWithHTML(
      email,
      password,
      "FIKANI Account",
      false,
      data.email,
      `security alert for ${data.email}`,
      html_file
    );
  }
}

module.exports = newLoginEmailAlert;
