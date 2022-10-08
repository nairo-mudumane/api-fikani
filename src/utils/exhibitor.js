const { isEmpty, isObjectEmpty } = require("./empty");
const { formatUrlStr } = require("./url");

const checkExhibitorFields = (exhibitor) => {
  const errors = [];
  const msg = `must not be null`;

  if (isObjectEmpty(exhibitor)) {
    throw new Error("no payload was provided");
  }

  if (isEmpty(exhibitor.name)) {
    errors.push(`name ${msg}`);
  }

  if (isEmpty(exhibitor.category)) {
    errors.push(`category ${msg}`);
  }

  if (isEmpty(exhibitor.email)) {
    errors.push(`email ${msg}`);
  }

  if (isEmpty(exhibitor.contact1)) {
    errors.push(`contact1 ${msg}`);
  }

  if (isEmpty(exhibitor.password)) {
    errors.push(`password ${msg}`);
  }

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
};

const formatExhibitor = (exhibitor) => {
  const {} = exhibitor;
  const key = formatUrlStr(exhibitor.name).valid_url;
  const is_active = false;
  const is_buyer = false;
  const email_verified = false;
  const video_presentation = null;

  const response = {
    ...exhibitor,
    is_active,
    is_buyer,
    video_presentation,
    email_verified,
    key,
  };

  return response;
};

module.exports = {
  checkExhibitorFields,
  formatExhibitor,
};
