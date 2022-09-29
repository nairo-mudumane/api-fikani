const model = require("../../models/exhibitor");
const { isObjectEmpty, isEmpty } = require("../../utils/empty");
const passwordUtils = require("../../utils/password");
const dbUtils = require("../../utils/mongoose");

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

module.exports = getById;
