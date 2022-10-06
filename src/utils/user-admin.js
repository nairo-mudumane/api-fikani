const { isObjectEmpty, isEmpty } = require("./empty");
const { removePasswordField } = require("./password");
const { formatUrlStr } = require("./url");

function checkAdminFields(admin) {
  const errors = [];
  const msg = `must not be null`;

  if (isObjectEmpty(admin)) {
    throw new Error("no payload provided");
  }

  if (isEmpty(admin.name)) {
    errors.push(`name ${msg}`);
  }

  if (isEmpty(admin.email)) {
    errors.push(`email ${msg}`);
  }

  if (isEmpty(admin.phone_number)) {
    errors.push(`phone_number ${msg}`);
  }

  if (errors.length > 0) {
    throw new Error(errors.toString());
  } else {
    return true;
  }
}

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

function formatUserAdmin(admin, options) {
  const { name } = admin;
  const access_key = generateAccessKey(6);
  const url_key = formatUrlStr(name).valid_url;
  let formatted;

  formatted = {
    ...admin,
    url_key,
    access_key,
    role: "admin",
    last_login: null,
    login_history: null,
    access_token: null,
    email_verified: false,
  };

  if (options && options.role && options.role === 0) {
    formatted = {
      ...formatted,
      role: "super-admin",
    };
  }

  if (options && options.role && options.role === 1) {
    formatted = {
      ...formatted,
      role: "admin",
    };
  }

  return formatted;
}

module.exports = {
  generateAccessKey,
  removePrivateFields,
  formatUserAdmin,
  checkAdminFields,
};
