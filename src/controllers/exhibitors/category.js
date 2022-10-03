const data = require("../../config/exhibitor-data.json");
const { isObjectEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

const getExhibitorCategory = (req, res) => {
  const queryParams = req.query;

  if (isObjectEmpty(queryParams)) {
    const categories = data.category.pt;
    return res.status(200).json({ message: "ok", data: categories });
  }

  try {
    const queryFilters = queryUtils.handleQueryKeys(queryParams, {
      filters: ["language"],
    });

    if (queryFilters[0].language === "pt") {
      const categories = data.category.pt;
      return res.status(200).json({ message: "ok", data: categories });
    } else {
      throw new Error(`value [${queryFilters[0].language}] not supported`);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getExhibitorCategory };
