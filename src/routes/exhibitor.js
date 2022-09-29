const { postRandomData } = require("../controllers/dev");
const controller = require("../controllers/exhibitor");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create).get(controller.getAll);
  app.route("/exhibitor/:id").get(controller.getById);
  app.get("/exhibitors/search", controller.search);
};

module.exports = {
  ExhibitorRoutes,
};
