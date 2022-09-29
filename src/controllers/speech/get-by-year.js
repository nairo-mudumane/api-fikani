const model = require("../../models/speech");
const utils = require("../../utils/speech");

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

module.exports = getByYear;
