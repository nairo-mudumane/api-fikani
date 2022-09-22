const utils = require("../controllers/news");
const { upload } = require("../middleware/upload");

const NewsRoutes = (app) => {
  app.post("/news", upload.single("image"), utils.create);
};

module.exports = {
  NewsRoutes,
};
