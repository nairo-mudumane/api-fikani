const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MediaModel = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const NewsModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    media: MediaModel,
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsModel", NewsModel, "news");
