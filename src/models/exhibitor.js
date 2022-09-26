const mongoose = require("mongoose");
const ExhibitorProductSchema = require("./product-exhibitor").schema;

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
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_buyer: {
      type: Boolean,
      required: true,
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
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    contact1: {
      type: String,
      required: true,
    },
    contact2: {
      type: String,
      required: false,
    },
    products: [ExhibitorProductSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ExhibitorSchema",
  ExhibitorSchema,
  "exhibitors"
);
