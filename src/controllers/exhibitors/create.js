const model = require("../../models/exhibitor");
const utils = require("../../utils/exhibitor");
const { formatUrlStr } = require("../../utils/url");
const upload = require("../../utils/upload");
const bcrypt = require("bcryptjs");
const path = require("path");
const { getEmailTemplate } = require("../../services/get-email-template");
const mailer = require("../../services/mailer");
const removeFile = require("../../utils/fs");
const crypto = require("crypto");

const create = async (request, response) => {
  const payload = request.body;
  const file = request.file ? request.file : undefined;
  const filepath = file ? file.path : undefined;
  const filename = formatUrlStr(payload.name).valid_url;
  const email = process.env.INFO_EMAIL;
  const password = "#O" + process.env.INFO_EMAIL_PASSWORD.toString();
  let avatarUrl;
  let formattedExhibitor;

  try {
    utils.checkExhibitorFields(payload);
    const isEmailTaken = await model
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    if (isEmailTaken) {
      if (file) {
        removeFile(file.path);
      }
      throw new Error(`path: email [${payload.email}] already taken`);
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  if (file && filepath) {
    try {
      avatarUrl = await upload.uploadSingleFile(
        "exhibitors/avatar",
        filepath,
        filename
      );
    } catch (error) {
      return response.status(500).json({ message: "failed to upload avatar" });
    }
  }

  try {
    formattedExhibitor = utils.formatExhibitor({
      ...payload,
      avatar: avatarUrl,
    });
    const optional_email = formattedExhibitor.email_optional
      ? [formattedExhibitor.email_optional]
      : undefined;

    const hashedPassword = await bcrypt.hash(formattedExhibitor.password, 10);
    formattedExhibitor.password = hashedPassword;

    const email_token = crypto.randomBytes(50).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);
    formattedExhibitor.email_token = email_token;
    formattedExhibitor.email_token_expires = now;

    const createdExhibitor = await model
      .create(formattedExhibitor)
      .then((result) => {
        return result._doc;
      });

    const html_data = {
      name: formattedExhibitor.name,
      email: formattedExhibitor.email,
      key: formattedExhibitor.key,
      email_token,
    };
    const ejs_file = path.resolve(
      "src/email-templates/welcome-exhibitor/welcome-exhibitor.ejs"
    );
    const html_file = await getEmailTemplate(ejs_file, html_data);

    mailer.sendMailWithHTML(
      email,
      password,
      "FIKANI Account",
      false,
      createdExhibitor.email,
      "Welcome to FIKANI - email confirmation",
      html_file,
      optional_email
    );

    return response.status(201).json({
      message: "created",
      data: {
        _id: createdExhibitor._id,
        key: createdExhibitor.key,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = create;
