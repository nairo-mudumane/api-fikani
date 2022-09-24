const { isObjectEmpty } = require("./empty");

function handleQueryKeys(queryObj, options) {
  if (isObjectEmpty(options) || isObjectEmpty(queryObj)) {
    return undefined;
  } else if (!isObjectEmpty(options)) {
    const results = [];
    const errors = [];
    const errorMsg = "not supported";

    if (!isObjectEmpty(options.filters)) {
      Object.keys(queryObj).map((key) => {
        if (options.filters.includes(key)) {
          results.push({
            [key]: queryObj[key],
          });
        } else {
          errors.push(key.toString());
        }
      });
    }

    if (errors.length > 0) {
      throw new Error(`filters: [${errors.toString()}] ${errorMsg}`);
    }

    return results;
  }
  return undefined;
}

module.exports = {
  handleQueryKeys,
};
