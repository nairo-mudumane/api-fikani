const controller = require("../controllers/admin");

const AdminRoutes = (app) => {
  app.route("/admin/users/super").post(controller.createRootAdmin);
};

module.exports = { AdminRoutes };
