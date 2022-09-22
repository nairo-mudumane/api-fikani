const { NewsRoutes } = require("./news");
const { OpeningSpeechRoutes } = require("./speech");

module.exports = (app) => {
  OpeningSpeechRoutes(app);
  NewsRoutes(app);
};
