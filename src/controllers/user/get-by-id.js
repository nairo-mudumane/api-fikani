const model = require("../../models/user");
const dbUtils = require("../../utils/mongoose");
const { isObjectEmpty, isEmpty } = require("../../utils/empty");
const { removePrivateFields } = require("../../utils/user-admin");

const getById = async (req, res) => {
  const params = req.params;
  let user;

  if (isEmpty(params.id)) {
    return res.status(400).json({ message: "parameter 'id' is required" });
  }

  try {
    if (dbUtils.isValidObjectId(params.id)) {
      user = await model
        .findOne({
          _id: params.id,
        })
        .then((result) => {
          return result._doc;
        });
    } else {
      user = await model
        .findOne({
          key: params.id,
        })
        .then((result) => {
          return result._doc;
        });
    }

    if (isObjectEmpty(user)) {
      return res.status(404).json({ message: "not found" });
    }

    user = removePrivateFields(user);

    return res.status(200).json({ message: "ok", totalResults: 1, data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getById;
