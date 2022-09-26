const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ExhibitorProductSchema",
  ExhibitorProductSchema,
  "exhibitor-products"
);
