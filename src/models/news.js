const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    short_body: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    author_key: {
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
    news_url: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: false,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsModel", NewsModel, "news");
