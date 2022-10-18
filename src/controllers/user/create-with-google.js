const model = require("../../models/user");
const modelExhibitor = require("../../models/exhibitor");
const modelUserAdmin = require("../../models/user-admin");
const jwt = require("jsonwebtoken");
const DeviceDetector = require("node-device-detector");
const newLoginEmailAlert = require("../../services/new-login-email-alert");
const authConfig = require("../../config/auth.json");
const utils = require("../../utils/user");
const { getEmailTemplate } = require("../../services/get-email-template");
const mailer = require("../../services/mailer");
const removeFile = require("../../utils/fs");
const { removePrivateFields } = require("../../utils/user-admin");

const CreateWithGoogle = async (request, response) => {
  let formattedUser;
  const payload = request.body;
  const file = request.file ? request.file : undefined;
  const email = process.env.INFO_EMAIL;
  const password = "#O" + process.env.INFO_EMAIL_PASSWORD.toString();
  const userAgent = request.get("User-Agent");
  const deviceDetector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  const detector = deviceDetector.detect(userAgent);

  const device = {
    type: detector.device.type,
    name: detector.os.name,
  };

  try {
    utils.checkUserFields(payload, true);

    const user = await model
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    const exhibitor = await modelExhibitor
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    const userAdmin = await modelUserAdmin
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    if (user || exhibitor || userAdmin) {
      if (file) {
        removeFile(file.path);
      }
      throw new Error(`path: email [${payload.email}] already taken`);
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  try {
    formattedUser = utils.formatUser(payload);
    formattedUser["email_verified"] = true;

    const createdUser = await model.create(formattedUser).then((result) => {
      return result._doc;
    });

    formattedUser = removePrivateFields(createdUser);

    const token = jwt.sign(
      { _id: formattedUser._id, key: formattedUser.key },
      authConfig.user_secret,
      {
        expiresIn: 86400,
      }
    );

    const html_data = {
      device,
      firstname: formattedUser.firstname,
      lastname: formattedUser.lastname,
      email: formattedUser.email,
    };

    const ejs_file = path.resolve(
      "src/email-templates/welcome-user/welcome-user-social-media.ejs"
    );
    const html_file = await getEmailTemplate(ejs_file, html_data);

    await mailer.sendMailWithHTML(
      email,
      password,
      `FIKANI Account`,
      false,
      createdUser.email,
      `[FIKANI]: Welcome ${formattedUser.firstname} ${formattedUser.lastname}`,
      html_file
    );

    await newLoginEmailAlert("user", email_data);

    return response.status(201).json({
      message: "created",
      data: {
        ...formattedUser,
        token,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateWithGoogle,
};
