const model = require("../models/exhibitor");
const { isObjectEmpty } = require("../utils/empty");
const utils = require("../utils/exhibitor");
const passwordUtils = require("../utils/password");

const create = async (req, res) => {
  const payload = req.body;

  try {
    utils.checkExhibitorFields(payload);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const formattedExhibitor = utils.formatExhibitor(payload);

  return res.json(formattedExhibitor);
};

const getAll = async (req, res) => {
  const queryParams = req.query;
  const noPasswordExhibitors = [];

  if (isObjectEmpty(queryParams)) {
    try {
      const exhibitors = await model
        .find()
        .sort({ createdAt: -1 })
        .limit(30)
        .then((results) => {
          return results;
        });

      exhibitors.forEach((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      const totalResults = noPasswordExhibitors.length;

      return res
        .status(200)
        .json({ message: "ok", totalResults, data: noPasswordExhibitors });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  create,
  getAll,
};
