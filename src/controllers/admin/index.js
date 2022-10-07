const { createUserAdmin } = require("./create-admin");
const { createSuperAdmin } = require("./create-super-admin");
const { getSuperAdminById } = require("./get-by-id");

module.exports = {
  createSuperAdmin,
  getSuperAdminById,
  createUserAdmin,
};
