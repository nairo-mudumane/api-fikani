const controller = require("../controllers/exhibitor");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create).get(controller.getAll);
};

module.exports = {
  ExhibitorRoutes,
};
