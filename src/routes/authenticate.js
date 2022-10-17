const userController = require("../controllers/auth");

const authenticateRoutes = (app) => {
  app.post("/login", userController.userAuthenticate);
};

module.exports = { authenticateRoutes };
