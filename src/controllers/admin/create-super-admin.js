const model = require("../../models/user-admin");
const adminUtils = require("../../utils/user-admin");

const createSuperAdmin = async (req, res) => {
  const payload = req.body;
  let prevAdmins;
  let prevSuperAdmin;
  let formattedAdmin;
  let allAdmins;

  // check provided fields
  try {
    adminUtils.checkAdminFields(payload);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // check if email wasn't taken
  try {
    prevAdmins = await model.find().then((results) => {
      return results;
    });

    if (prevAdmins && prevAdmins.length > 0) {
      const emailTaken = prevAdmins.find((admin) => {
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
    allAdmins = await model.find().then((results) => {
      return results;
    });

    if (allAdmins && allAdmins.length === 0) {
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
