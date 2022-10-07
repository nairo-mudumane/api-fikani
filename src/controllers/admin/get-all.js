const model = require("../../models/user-admin");
const adminUtils = require("../../utils/user-admin");

const getAllAdmins = async (req, res) => {
  let allAdmins = [];
  let noSuperAdminUsers = [];
  let noPasswordAdmins = [];

  try {
    allAdmins = await model.find().then((record) => {
      return record;
    });

    noSuperAdminUsers = adminUtils.omitSuperAdmins(allAdmins);
    noSuperAdminUsers.forEach((admin) => {
      noPasswordAdmins.push(adminUtils.removePrivateFields(admin._doc));
    });

    return res.status(200).json({ message: "ok", data: noPasswordAdmins });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAdmins,
};
