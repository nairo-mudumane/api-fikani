const userController = require("../controllers/auth-user");
const exhibitorController = require("../controllers/auth-exhibitor");
const { detectDeviceInformation } = require("../middleware/device");

const authenticateRoutes = (app) => {
  app.post("/login", detectDeviceInformation, userController.userAuthenticate);
  app.post(
    "/sign",
    detectDeviceInformation,
    exhibitorController.exhibitorAuthenticate
  );
};

module.exports = { authenticateRoutes };
