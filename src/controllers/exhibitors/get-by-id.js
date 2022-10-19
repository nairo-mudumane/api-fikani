const model = require("../../models/exhibitor");
const { isEmpty } = require("../../utils/empty");
const dbUtils = require("../../utils/mongoose");

const getById = async (request, response) => {
  const params = request.params;
  let exhibitor;

  if (isEmpty(params.id)) {
    return res
      .status(400)
      .json({ message: "parameter 'id' or 'key' is required" });
  }

  try {
    if (dbUtils.isValidObjectId(params.id)) {
      exhibitor = await model
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
      exhibitor = await model
        .findOne({
          key: params.id,
        })
        .then((result) => {
          if (result) {
            return result._doc;
          }
          return null;
        });
    }

    if (!exhibitor || !exhibitor._id) {
      return response.status(404).json({ message: "not found" });
    }

    exhibitor.products = undefined;
    return response
      .status(200)
      .json({ message: "ok", totalResults: 1, data: exhibitor });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = getById;
