// const { postRandomData } = require("../controllers/dev");
const controller = require("../controllers/exhibitors");

const ExhibitorRoutes = (app) => {
  app.route("/exhibitors").post(controller.create).get(controller.getAll);
  app.route("/exhibitor/:id").get(controller.getById);
  app.get("/exhibitors/search/:name", controller.search);

  // categories
  app.get("/exhibitors/category", controller.getExhibitorCategory);
};

module.exports = {
  ExhibitorRoutes,
};
