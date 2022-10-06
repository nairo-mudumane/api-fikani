const { isObjectEmpty, isEmpty } = require("./empty");
const adminUtils = require("./user-admin");

function checkUSerAdminSuper(admin) {
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

function formatUserAdminSuper(admin) {
  const access_key = adminUtils.generateAccessKey(6);

  const formatted = {
    ...admin,
    last_login: "never",
    is_super: true,
    access_key,
  };

  return formatted;
}

module.exports = {
  checkUSerAdminSuper,
  formatUserAdminSuper,
};
