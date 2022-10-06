const model = require("../../models/user-admin");
const adminUtils = require("../../utils/user-admin");
const { isValidObjectId } = require("../../utils/mongoose");

const getSuperAdminById = async (req, res) => {
  const params = req.params;

  if (!isValidObjectId(params.id)) {
    return res.status(400).json({ message: "invalid id" });
  }

  try {
    const result = await model.findById(params.id).then((record) => {
      return record._doc;
    });

    if (!result) {
      return res.status(404).json({ message: "not found" });
    } else {
      const noPrivateFields = adminUtils.removePrivateFields(result);
      return res.status(200).json({ message: "ok", data: noPrivateFields });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSuperAdminById,
};
