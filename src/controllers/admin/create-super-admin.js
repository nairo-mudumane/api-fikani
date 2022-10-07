const model = require("../../models/user-admin");
const adminUtils = require("../../utils/user-admin");
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../services/mailer");

const createSuperAdmin = async (req, res) => {
  const payload = req.body;
  let prevSuperAdmin;
  let formattedAdmin;
  let allAdmins;
  const email = process.env.INFO_EMAIL;
  const password = `#${process.env.INFO_EMAIL_PASSWORD}`;

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

  // override existing super admin or create new
  try {
    if (allAdmins && allAdmins.length === 0) {
      formattedAdmin = adminUtils.formatUserAdmin(payload, {
        role: 0,
      });

      const htmlData = {
        name: formattedAdmin.name,
        access_key: formattedAdmin.access_key,
      };

      const filename = path.resolve(`welcome-super-admin.ejs`);

      console.info("filename: ", filename);
      const htmlFile = ejs.renderFile(
        filename,
        { data: htmlData },
        (err, file) => {
          if (err) {
            throw new Error(err.message);
          } else {
            console.info("file: ", file);
            return file;
          }
        }
      );

      console.info("htmlFile: ", htmlFile);

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

    if (allAdmins && allAdmins.length > 0) {
      prevSuperAdmin = allAdmins.find((admin) => {
        if (admin.role === "super-admin") {
          return admin;
        }
      });

      if (!prevSuperAdmin) {
        formattedAdmin = adminUtils.formatUserAdmin(payload, {
          role: 0,
        });

        const createdAdmin = await model
          .create(formattedAdmin)
          .then((record) => {
            return record._doc;
          });

        return res.status(201).json({
          message: "created",
          data: {
            _id: createdAdmin._id,
            url_key: createdAdmin.url_key,
          },
        });
      } else if (prevSuperAdmin) {
        await model.findOneAndUpdate(
          { role: "super-admin" },
          { role: "admin" }
        );

        formattedAdmin = adminUtils.formatUserAdmin(payload, {
          role: 0,
        });

        const createdAdmin = await model
          .create(formattedAdmin)
          .then((record) => {
            return record._doc;
          });

        return res.status(201).json({
          message: "created",
          data: {
            _id: createdAdmin._id,
            url_key: createdAdmin.url_key,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSuperAdmin,
};
