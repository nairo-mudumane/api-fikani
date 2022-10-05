const controller = require("../controllers/exhibitors");
const { postRandomData } = require("../controllers/exhibitors/dev");
const { upload } = require("../middleware/upload");

const ExhibitorRoutes = (app) => {
  app.post("/exhibitors/new", upload.single("avatar"), controller.create);
  app.get("/exhibitors", controller.getAll);
  app.route("/exhibitor/:id").get(controller.getById);
  app.get("/exhibitors/search/:name", controller.search);

  // categories
  app.get("/exhibitors/category", controller.getExhibitorCategory);

  // dev
  app.post("/exhibitors/dev/new", postRandomData);
};

module.exports = {
  ExhibitorRoutes,
};
