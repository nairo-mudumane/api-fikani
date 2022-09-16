const controller = require("../controllers/speech");

const OpeningSpeechRoutes = (app) => {
  app.route("/speech").post(controller.create).get(controller.getAll);
  app.route("/speech/:year").get(controller.getByYear);
};

module.exports = {
  OpeningSpeechRoutes,
};
