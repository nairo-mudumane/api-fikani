const model = require("../models/news");
const upload = require("../utils/upload");
const { formatUrlStr } = require("../utils/url");
const utils = require("../utils/news");
const { isEmpty } = require("../utils/empty");

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
  try {
    const news = await model
      .find()
      .sort({ date: -1 })
      .then((results) => {
        return results;
      });
    return res.status(200).json({ message: "ok", data: news });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const params = req.params;
  try {
    const result = await model.findOne({
      // $or
    });

    if (isEmpty(result)) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({ message: "ok", data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
