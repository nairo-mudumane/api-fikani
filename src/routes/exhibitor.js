const { postRandomData } = require("../controllers/dev");
const controller = require("../controllers/exhibitor");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create).get(controller.getAll);
  app.route("/exhibitors/:id").get(controller.getById);
};

module.exports = {
  ExhibitorRoutes,
};
