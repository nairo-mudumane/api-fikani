const NotFound = (app) => {
  app.all("/*", (req, res) => {
    return res
      .status(404)
      .json({ message: `Sorry, can not ${req.method} ${req.url}` });
  });
};

module.exports = {
  NotFound,
};
