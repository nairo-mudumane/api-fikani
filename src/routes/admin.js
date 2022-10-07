const controller = require("../controllers/admin");

const AdminRoutes = (app) => {
  app
    .route("/admin/users/")
    .post(controller.createUserAdmin)
    .get(controller.getAllAdmins);

  // super admin
  app.route("/admin/users/super").post(controller.createSuperAdmin);
  app.route("/admin/user/super/:id").get(controller.getSuperAdminById);
};

module.exports = { AdminRoutes };
