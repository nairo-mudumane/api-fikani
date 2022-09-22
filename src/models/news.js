const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsModel", NewsModel, "news");
