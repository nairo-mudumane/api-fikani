const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductCommentsSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExhibitorProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String, // product | service
      required: true,
      default: "product",
    },
    total: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    total_sold: {
      type: String,
      required: true,
      default: 0,
    },
    comments: {
      type: [ProductCommentsSchema],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ExhibitorProductSchema",
  ExhibitorProductSchema
);
