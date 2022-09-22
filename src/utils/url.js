function formatUrlStr(str) {
  if (str) {
    const removeAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeWhiteSpacesAndUpperCase = removeAccents
      .replace(/\s/g, "-")
      .toLowerCase();

    const response = {
      valid_url: removeWhiteSpacesAndUpperCase,
      provided_url: str,
    };

    return response;
  }
  return undefined;
}

module.exports = {
  formatUrlStr,
};
