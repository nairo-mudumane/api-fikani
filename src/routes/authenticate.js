const userController = require("../controllers/auth-user");
const exhibitorController = require("../controllers/auth-exhibitor");
const { detectDeviceInformation } = require("../middleware/device");
const { exhibitorAuthMiddleware } = require("../middleware/auth");

const authenticateRoutes = (app) => {
  app.post("/login", detectDeviceInformation, userController.userAuthenticate);
  app.post(
    "/sign",
    detectDeviceInformation,
    exhibitorController.exhibitorAuthenticate
  );

  app.post(
    "/exhibitor/:id/refresh",
    exhibitorAuthMiddleware,
    exhibitorController.refreshExhibitor
  );
};

module.exports = { authenticateRoutes };
