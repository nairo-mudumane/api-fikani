const { postRandomData } = require("../controllers/dev");
const controller = require("../controllers/exhibitor");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create).get(controller.getAll);
  app.post("/dev/exhibitors", postRandomData);
};

module.exports = {
  ExhibitorRoutes,
};
