function isStringEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return true;
  } else {
    return false;
  }
}

function isObjectEmpty(value) {
  if (Object.keys(value).length === 0 && value.constructor === Object) {
    return true;
  } else {
    return false;
  }
}

function isArrayEmpty(value) {
  if (!value || value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function isEmpty(value) {
  if (typeof value === "string") {
    return isStringEmpty(value);
  } else if (typeof value === "Object") {
    return isObjectEmpty(value);
  } else {
    return isArrayEmpty(value);
  }
}

module.exports = {
  isEmpty,
  isArrayEmpty,
  isStringEmpty,
  isObjectEmpty,
};
