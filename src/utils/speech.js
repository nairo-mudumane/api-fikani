const regex = /^(202[0-2]|20[0-2]\d)$/;
// |200\d|201[0-3]

function isValidYear(year) {
  if (year && year.length === 4) {
    try {
      const numYear = parseInt(year);
      console.log("regex valueOf: ", regex.test(numYear).valueOf());
      console.log("regex: ", regex.test(numYear));
      if (regex.test(numYear)) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
}

module.exports = {
  isValidYear,
};
