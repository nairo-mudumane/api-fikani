const { isObjectEmpty } = require("./empty");

const removePasswordField = (obj) => {
  if (isObjectEmpty(obj)) {
    return undefined;
  }

  const response = {};

  Object.keys(obj).map((key) => {
    if (key !== "password") {
      response[key] = obj[key];
    }
  });

  return response;
};

module.exports = {
  removePasswordField,
};
