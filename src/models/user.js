const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserSchema", UserSchema, "users");
