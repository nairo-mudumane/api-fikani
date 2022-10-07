const { isObjectEmpty, isEmpty, isArrayEmpty } = require("./empty");
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

  let formatted = {
    ...admin,
    url_key,
    access_key,
    last_login: null,
    login_history: null,
    access_token: null,
    email_verified: false,
  };

  if (!isObjectEmpty(options)) {
    if (options.role === 0) {
      formatted["role"] = "super-admin";
    }

    if (options.role === 1) {
      formatted["role"] = "admin";
    }
  }

  return formatted;
}

function omitSuperAdmins(admins) {
  let noSuperAdminUsers = [];

  if (!isArrayEmpty(admins)) {
    noSuperAdminUsers = admins.filter((admin) => {
      if (admin.role !== "super-admin") {
        return admin;
      }
    });
  }

  return noSuperAdminUsers;
}

module.exports = {
  generateAccessKey,
  removePrivateFields,
  formatUserAdmin,
  checkAdminFields,
  omitSuperAdmins,
};
