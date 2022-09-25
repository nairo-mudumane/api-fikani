const controller = require("../controllers/exhibitor");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create);
};

module.exports = {
  ExhibitorRoutes,
};
