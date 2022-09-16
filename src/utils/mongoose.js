const mongoose = require("mongoose");

function isValidObjectId(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return true;
  }

  return false;
}

module.exports = {
  isValidObjectId,
};
