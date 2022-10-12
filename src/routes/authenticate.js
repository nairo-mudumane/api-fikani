const userController = require("../controllers/auth");
const device = require("express-device");

const authenticateRoutes = (app) => {
  app.use(device.capture());
  app.post("/login", userController.userAuthenticate);
};

module.exports = { authenticateRoutes };
