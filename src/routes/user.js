const controller = require("../controllers/user");
const { upload } = require("../middleware/upload");

const UserRoutes = (app) => {
  app.post("/users/new", upload.single("avatar"), controller.create);
};

module.exports = { UserRoutes };
