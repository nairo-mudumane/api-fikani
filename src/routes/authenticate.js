const userController = require("../controllers/auth");
const { detectDeviceInformation } = require("../middleware/device");

const authenticateRoutes = (app) => {
  app.post("/login", detectDeviceInformation, userController.userAuthenticate);
};

module.exports = { authenticateRoutes };
