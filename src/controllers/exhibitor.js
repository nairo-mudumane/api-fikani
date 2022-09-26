const model = require("../models/exhibitor");
const { isObjectEmpty } = require("../utils/empty");
const utils = require("../utils/exhibitor");

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

  if (isObjectEmpty(queryParams)) {
    try {
      const exhibitors = await model
        .find()
        .sort({ date: -1 })
        .then((results) => {
          return results;
        });
      const totalResults = exhibitors.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: exhibitors });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  create,
  getAll,
};
