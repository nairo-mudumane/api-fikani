const controller = require("../controllers/news");
const { upload } = require("../middleware/upload");

const NewsRoutes = (app) => {
  app.post("/news", upload.single("media"), controller.create);
  app.get("/news", controller.getAll);
  app.route("/news/:key").get(controller.getById);
};

module.exports = {
  NewsRoutes,
};
