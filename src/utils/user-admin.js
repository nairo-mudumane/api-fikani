const { removePasswordField } = require("./password");

function generateAccessKey(length) {
  if (length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result =
        result +
        characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

function removePrivateFields(admin) {
  if (admin) {
    const noPassword = removePasswordField(admin);
    const response = {};

    Object.keys(noPassword).filter((key) => {
      if (
        key !== "access_key" &&
        key !== "login_history" &&
        key !== "last_login"
      ) {
        response[key] = noPassword[key];
      }
    });

    return response;
  }
}

module.exports = {
  generateAccessKey,
  removePrivateFields,
};
