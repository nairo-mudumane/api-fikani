const model = require("../models/exhibitor");
const { isObjectEmpty, isEmpty } = require("../utils/empty");
const utils = require("../utils/exhibitor");
const passwordUtils = require("../utils/password");
const queryUtils = require("../utils/query");
const dbUtils = require("../utils/mongoose");

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
  } else {
    try {
      const queryFilters = queryUtils.handleQueryKeys(queryParams, {
        filters: ["category"],
      });

      const filteredExhibitors = await model
        .find({ $or: [...queryFilters] })
        .sort({ createdAt: -1 });

      const totalResults = filteredExhibitors.length;

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res
        .status(200)
        .json({ message: "ok", totalResults, data: noPasswordExhibitors });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const getById = async (req, res) => {
  const params = req.params;

  if (isEmpty(params.id)) {
    return res.status(400).json({ message: "parameter 'id' is required" });
  }

  if (!dbUtils.isValidObjectId(params.id)) {
    return res.status(400).json({ message: "invalid objectId format" });
  }

  try {
    const result = await model.findById(params.id);

    if (isObjectEmpty(result)) {
      return res.status(404).json({ message: "not found" });
    }

    const noPasswordExhibitor = passwordUtils.removePasswordField(result._doc);

    return res
      .status(200)
      .json({ message: "ok", totalResults: 1, data: noPasswordExhibitor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
