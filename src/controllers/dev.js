const model = require("../models/exhibitor");
// const { formatUrlStr } = require("../utils/url");
const utils = require("../utils/exhibitor");

const postRandomData = async (req, res) => {
  const payload = req.body;
  const formatted = [];

  payload.forEach((data) => {
    formatted.push(utils.formatExhibitor(data));
  });

  try {
    const results = await model.insertMany(formatted);
    const totalResults = results.length;
    return res.status(202).json({ totalResults, message: "created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postRandomData,
};
