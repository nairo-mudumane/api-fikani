const model = require("../../models/news");
const { isArrayEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

const search = async (req, res) => {
  const params = req.params;
  const queryParams = req.query;

  try {
    const queryFilters = queryUtils.handleQueryKeys(queryParams, {
      filters: ["category", "date", "author"],
    });

    if (isArrayEmpty(queryFilters)) {
      const filteredNews = await model
        .find({ title: { $regex: params.title, $options: "i" } })
        .sort({ date: -1 });

      const totalResults = filteredNews.length;

      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    }

    const queryCategory = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "category") {
          return field[key];
        }
      });
    });

    const queryDate = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "date") {
          return field[key];
        }
      });
    });

    const queryAuthor = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "author") {
          return field[key];
        }
      });
    });

    if (queryDate && queryCategory && queryAuthor) {
      const filteredNews = await model
        .find({
          $and: [
            { title: { $regex: params.title, $options: "i" } },
            { date: { $gte: queryDate.date } },
            { category: { $regex: queryCategory.category, $options: "i" } },
            { author: { $regex: queryAuthor.author, $options: "i" } },
          ],
        })
        .sort({ createdAt: -1 });

      const totalResults = filteredNews.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    } else if (queryDate) {
      const filteredNews = await model
        .find({
          $and: [
            { title: { $regex: params.title, $options: "i" } },
            { date: { $gte: queryDate.date } },
          ],
        })
        .sort({ createdAt: -1 });

      const totalResults = filteredNews.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    } else if (queryCategory) {
      const filteredNews = await model
        .find({
          $and: [
            { title: { $regex: params.title, $options: "i" } },
            { category: { $regex: queryCategory.category, $options: "i" } },
          ],
        })
        .sort({ createdAt: -1 });

      const totalResults = filteredNews.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    } else if (queryAuthor) {
      const filteredNews = await model
        .find({
          $and: [
            { title: { $regex: params.title, $options: "i" } },
            { author: { $regex: queryAuthor.author, $options: "i" } },
          ],
        })
        .sort({ createdAt: -1 });

      const totalResults = filteredNews.length;
      return res
        .status(200)
        .json({ message: "ok", totalResults, data: filteredNews });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = search;
