const mongoose = require("mongoose");
const ExhibitorProductSchema = require("./product-exhibitor").schema;

const Schema = mongoose.Schema;

const ExhibitorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
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
      required: false,
      default: false,
    },
    is_buyer: {
      type: Boolean,
      required: false,
      default: false,
    },
    video_presentation: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_optional: {
      type: String,
      required: false,
    },
    email_verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
    country: {
      type: String,
      required: true,
      default: "Moçambique",
    },
    token: {
      type: String,
      required: false,
    },
    email_token: {
      type: String,
      required: false,
      select: false,
    },
    email_token_expires: {
      type: Date,
      required: false,
      select: false,
    },
    last_login: {
      device: {
        type: String,
        required: false,
        select: false,
      },
      date: {
        type: Date,
        required: false,
        select: false,
      },
    },
    login_history: [
      {
        device: {
          type: String,
          required: false,
          select: false,
        },
        date: {
          type: Date,
          required: false,
          select: false,
        },
      },
    ],
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
