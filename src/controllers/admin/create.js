const model = require("../../models/user-admin");
const adminUtils = require("../../utils/user-admin");

const createRootAdmin = async (req, res) => {
  const payload = req.body;
  let formattedAdmin;
  let prevAdmins;

  try {
    adminUtils.checkAdminFields(payload);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    prevAdmins = await model.find().then((results) => {
      return results;
    });

    if (prevAdmins || prevAdmins.length > 0) {
      const emailTaken = prevAdmins.find((admin) => {
        if (admin.email === payload.email) {
          return true;
        }
      });

      if (emailTaken && emailTaken.length > 0) {
        return res.status(400).json({ message: "email taken" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    if (prevAdmins && prevAdmins.length > 0) {
      const prevSuperAdmin = prevAdmins.find((admin) => {
        if (admin.role === "super-admin") {
          return admin;
        }
      });

      if (prevSuperAdmin && prevSuperAdmin.length > 0) {
        formattedAdmin = adminUtils.formatUserAdmin(payload, {
          role: 0,
        });

        await model.findOneAndUpdate(
          { role: "super-admin" },
          { role: "admin" }
        );

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
    } else {
      formattedAdmin = adminUtils.formatUserAdmin(payload, {
        role: 0,
      });

      const createdAdmin = await model.create(formattedAdmin).then((record) => {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRootAdmin,
};
