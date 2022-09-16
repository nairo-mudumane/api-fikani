const model = require("../models/speech");
const utils = require("../utils/speech");

const create = async (req, res) => {
  const payload = req.body;

  if (!payload) {
    return res.status(400).json({ message: "no data provided" });
  }

  try {
    const providedYear = payload.year ? payload.year : new Date().getFullYear();
    payload["year"] = providedYear;
    const pastSpeeches = await model.findOne({ year: payload.year });

    if (pastSpeeches && pastSpeeches.year === payload.year) {
      throw new Error();
    } else {
      try {
        const result = await model.create(payload);

        return res
          .status(201)
          .json({ message: "created", data: { _id: result.id } });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: `can not duplicate years. ${payload.year} already registered.`,
    });
  }
};

const getByYear = async (req, res) => {
  const params = req.params;

  if (!params.year && !utils.isValidYear(params.year)) {
    return res.status(400).json({ message: "invalid year" });
  }

  try {
    const speech = await model
      .findOne({ year: params.year })
      .sort({ createdAt: -1 });

    if (!speech) {
      return res.status(404).json({ message: "speech not found" });
    }

    return res.status(200).json({ message: "ok", data: speech });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const speeches = await model.find().sort({ createdAt: 1, year: 1 });

    return res.status(200).json({ message: "ok", data: speeches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getByYear,
};
