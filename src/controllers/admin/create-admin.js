const path = require("path");
const model = require("../../models/user-admin");
const mailer = require("../../services/mailer");
const adminUtils = require("../../utils/user-admin");
const { getEmailTemplate } = require("../../services/get-email-template");

const createUserAdmin = async (req, res) => {
  const payload = req.body;
  let formattedAdmin;
  let allAdmins;
  const email = process.env.INFO_EMAIL;
  const password = "#O" + process.env.INFO_EMAIL_PASSWORD.toString();

  // check provided fields
  try {
    adminUtils.checkAdminFields(payload);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // check if email wasn't taken
  try {
    allAdmins = await model.find().then((results) => {
      return results;
    });

    if (allAdmins && allAdmins.length > 0) {
      const emailTaken = allAdmins.find((admin) => {
        if (admin.email === payload.email) {
          return true;
        }
      });

      if (emailTaken) {
        return res.status(400).json({ message: "email taken" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    if (allAdmins && allAdmins.length === 0) {
      formattedAdmin = adminUtils.formatUserAdmin(payload, {
        role: 0,
      });

      const htmlData = {
        name: formattedAdmin.name,
        access_key: formattedAdmin.access_key,
      };

      const filename = path.resolve(
        `src/email-templates/welcome-super-admin/welcome-super-admin.ejs`
      );
      const htmlFile = await getEmailTemplate(filename, htmlData);

      const createdAdmin = await model.create(formattedAdmin).then((record) => {
        return record._doc;
      });

      await mailer.sendMailWithHTML(
        email,
        password,
        "FIKANI Account",
        null,
        createdAdmin.email,
        "Welcome to FIKANI",
        htmlFile
      );

      return res.status(201).json({
        message: "created",
        data: {
          _id: createdAdmin._id,
          url_key: createdAdmin.url_key,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    if (allAdmins && allAdmins.length > 0) {
      formattedAdmin = adminUtils.formatUserAdmin(payload, {
        role: 1,
      });

      const htmlData = {
        name: formattedAdmin.name,
        access_key: formattedAdmin.access_key,
      };

      const filename = path.resolve(
        `src/email-templates/welcome-admin/welcome-admin.ejs`
      );
      const htmlFile = await getEmailTemplate(filename, htmlData);

      const createdAdmin = await model.create(formattedAdmin).then((record) => {
        return record._doc;
      });

      await mailer.sendMailWithHTML(
        email,
        password,
        "FIKANI Account",
        false,
        createdAdmin.email,
        "Welcome to FIKANI",
        htmlFile
      );

      return res.status(201).json({
        message: "created",
        data: {
          _id: createdAdmin._id,
          url_key: createdAdmin.url_key,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserAdmin,
};
