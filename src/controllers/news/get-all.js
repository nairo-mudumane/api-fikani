const model = require("../../models/news");
const { isObjectEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

const getAll = async (req, res) => {
  const queryParams = req.query;

  if (isObjectEmpty(queryParams)) {
    try {
      const news = await model
        .find()
        .sort({ date: -1 })
        .then((results) => {
          return results;
        });
      const totalResults = news.length;
      return res.status(200).json({ message: "ok", totalResults, data: news });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const queryFilters = queryUtils.handleQueryKeys(queryParams, {
        filters: ["category", "author_key"],
      });

      const filteredNews = await model
        .find({ $or: [...queryFilters] })
        .sort({ date: -1 })
        .then((results) => {
          return results;
        });
      const totalResults = filteredNews.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = getAll;
