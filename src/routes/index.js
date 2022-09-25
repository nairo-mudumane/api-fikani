const { NotFound } = require("../controllers/not-found");
const { ExhibitorRoutes } = require("./exhibitor");
const { NewsRoutes } = require("./news");
const { OpeningSpeechRoutes } = require("./speech");

module.exports = (app) => {
  OpeningSpeechRoutes(app);
  NewsRoutes(app);
  ExhibitorRoutes(app);
  NotFound(app);
};
