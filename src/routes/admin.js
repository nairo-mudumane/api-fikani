const controller = require("../controllers/admin");

const AdminRoutes = (app) => {
  app.route("/admin/users/super").post(controller.createSuperAdmin);
  app.route("/admin/users/super/:id").get(controller.getSuperAdminById);
};

module.exports = { AdminRoutes };
