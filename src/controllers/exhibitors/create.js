// const model = require("../models/exhibitor");
// const { isObjectEmpty, isEmpty, isArrayEmpty } = require("../utils/empty");
const utils = require("../../utils/exhibitor");
// const passwordUtils = require("../utils/password");
// const queryUtils = require("../utils/query");
// const dbUtils = require("../utils/mongoose");

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

module.exports = create;
