const { NotFound } = require("../controllers/not-found");
const { AdminRoutes } = require("./user-admin");
const { ExhibitorRoutes } = require("./exhibitor");
const { NewsRoutes } = require("./news");
const { OpeningSpeechRoutes } = require("./speech");
const { UserRoutes } = require("./user");
const { authenticateRoutes } = require("./authenticate");

module.exports = (app) => {
  OpeningSpeechRoutes(app);
  NewsRoutes(app);
  ExhibitorRoutes(app);
  AdminRoutes(app);
  UserRoutes(app);
  authenticateRoutes(app);
  NotFound(app);
};
