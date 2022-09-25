const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExhibitorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    is_buyer: {
      type: Boolean,
      default: false,
    },
    video_presentation: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    contact1: {
      type: String,
      required: true,
    },
    contact2: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExhibitorSchema", ExhibitorSchema, {
  collection: "exhibitors",
});
