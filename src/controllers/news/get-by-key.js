const model = require("../../models/news");
const { isEmpty } = require("../../utils/empty");

const getByKey = async (req, res) => {
  const params = req.params;

  if (isEmpty(params.key)) {
    return res.status(400).json({ message: "parameter 'key' is required" });
  }

  try {
    const result = await model.findOne({ key: params.key });

    if (isEmpty(result)) {
      return res.status(404).json({ message: "not found" });
    }

    return res
      .status(200)
      .json({ message: "ok", totalResults: 1, data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getByKey;
