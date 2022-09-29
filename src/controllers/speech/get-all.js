const model = require("../../models/speech");

const getAll = async (req, res) => {
  try {
    const speeches = await model.find().sort({ createdAt: 1, year: 1 });

    return res.status(200).json({ message: "ok", data: speeches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAll;
