const model = require("../models/news");
const upload = require("../utils/upload");
const { formatUrlStr } = require("../utils/url");
const utils = require("../utils/news");
const { isEmpty, isObjectEmpty, isArrayEmpty } = require("../utils/empty");
const queryUtils = require("../utils/query");

const create = async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const filePath = file.path;
  const filename = formatUrlStr(payload.title).valid_url;
  let bannerUrl;

  try {
    utils.checkNewsFields({ ...payload, media: file });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    bannerUrl = await upload.uploadSingleFile(filePath, filename);
  } catch (error) {
    return res.status(500).json({ message: "failed to upload file" });
  }

  const data = {
    ...payload,
    media: {
      url: bannerUrl,
      type: file.mimetype,
    },
  };

  const formattedNews = utils.formatNews(data);

  try {
    const result = await model.create(formattedNews).then((res) => {
      return res;
    });

    return res.status(201).json({
      message: "created",
      data: {
        _id: result._id,
        key: result.key,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

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

const getByKey = async (req, res) => {
  const params = req.params;

  if (isEmpty(params.key)) {
    return res.status(400).json({ message: "parameter 'key' is required" });
  }

  try {
    const result = await model.findOne({ key: params.key });

    if (isEmpty(result)) {
      return res.status(404).json({ message: "not found" });
    }

    return res
      .status(200)
      .json({ message: "ok", totalResults: 1, data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  const params = req.params;
  const queryParams = req.query;

  try {
    const queryFilters = queryUtils.handleQueryKeys(queryParams, {
      filters: ["category", "date"],
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

    if (queryDate && queryCategory) {
      const filteredNews = await model
        .find({
          $and: [
            { title: { $regex: params.title, $options: "i" } },
            { date: { $gte: queryDate.date } },
            { category: { $regex: queryCategory.category, $options: "i" } },
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
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getByKey,
  search,
};
