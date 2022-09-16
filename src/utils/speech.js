function isValidYear(year) {
  if (year) {
    if (year >= 2020 && year <= 2022) {
      return true;
    }
  }
  return false;
}

module.exports = {
  isValidYear,
};
