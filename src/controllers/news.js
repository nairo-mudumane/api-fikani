const fs = require("fs");
const model = require("../models/news");
const upload = require("../utils/upload");

const create = async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const filePath = file.path;
  const filename = file.filename;
  let bannerUrl;

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

  try {
    const result = await model.create(data).then((res) => {
      console.log(res);
      return res;
    });

    return res.status(201).json({
      message: "created",
      data: {
        _id: result._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
};
