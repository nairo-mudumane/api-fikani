const model = require("../models/speech");
const utils = require("../utils/speech");

const create = async (req, res) => {
  const payload = req.body;
  let pastSpeeches;

  if (!payload) {
    return res.status(400).json({ message: "no data provided" });
  } else if (payload.year) {
    if (!utils.isValidYear(payload.year)) {
      return res.status(400).json({ message: "invalid year" });
    }
  }

  if (payload.year) {
    try {
      pastSpeeches = await model.find({ year: payload.year });
      if (pastSpeeches && pastSpeeches.length > 0) {
        throw new Error();
      } else {
        try {
          payload["year"] = new Date().getFullYear();
          const result = await model.create(payload);

          return res
            .status(201)
            .json({ message: "created", data: { _id: result.id } });
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: error.message });
        }
      }
    } catch (error) {
      return res.status(400).json({
        message: `can not duplicate years. ${payload.year} already registered.`,
      });
    }
  }

  try {
    const result = await model.create(payload);

    return res
      .status(201)
      .json({ message: "created", data: { _id: result.id } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

const getByYear = async (req, res) => {
  const params = req.params;

  if (!params.year && !utils.isValidYear(params.year)) {
    return res.status(400).json({ message: "invalid year" });
  }

  try {
    const speech = await model
      .find({ year: params.year })
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
    const speeches = await model.find().sort({ createdAt: -1 });

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
