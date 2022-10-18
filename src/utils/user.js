const { isObjectEmpty, isEmpty } = require("./empty");
const { formatUrlStr } = require("./url");

function checkUserFields(user, passwordNullable) {
  const errors = [];
  const msg = `must not be null`;

  if (isObjectEmpty(user)) {
    throw new Error("no payload provided");
  }

  if (isEmpty(user.firstname)) {
    errors.push(`firstname ${msg}`);
  }

  if (isEmpty(user.lastname)) {
    errors.push(`lastname ${msg}`);
  }

  if (isEmpty(user.email)) {
    errors.push(`email ${msg}`);
  }

  if (!passwordNullable) {
    if (isEmpty(user.password)) {
      errors.push(`password ${msg}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.toString());
  } else {
    return true;
  }
}

function formatUser(user) {
  const { firstname, lastname } = user;
  const key = formatUrlStr(`${firstname} ${lastname}`).valid_url;
  const email_verified = false;

  const response = {
    ...user,
    key,
    lastname,
    firstname,
    email_verified,
  };

  return response;
}

module.exports = {
  checkUserFields,
  formatUser,
};
