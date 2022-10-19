const model = require("../../models/user");
const { isEmpty } = require("../../utils/empty");
const dbUtils = require("../../utils/mongoose");

const getById = async (request, response) => {
  const params = request.params;
  let user;

  if (isEmpty(params.id)) {
    return res
      .status(400)
      .json({ message: "parameter 'id' or 'key' is required" });
  }

  try {
    if (dbUtils.isValidObjectId(params.id)) {
      user = await model
        .findOne({
          _id: params.id,
        })
        .then((result) => {
          if (result) {
            return result._doc;
          }
          return null;
        });
    } else {
      user = await model
        .findOne({
          $or: { key: params.id, name: params.id },
        })
        .then((result) => {
          if (result) {
            return result._doc;
          }
          return null;
        });
    }

    if (!user || !user._id) {
      return response.status(404).json({ message: "not found" });
    }

    user.products = undefined;
    return response
      .status(200)
      .json({ message: "ok", totalResults: 1, data: user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = getById;
