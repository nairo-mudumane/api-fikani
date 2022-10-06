const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSuperAdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    access_key: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: false,
    },
    is_super: {
      type: Boolean,
      required: true,
      default: false,
    },
    last_login: {
      type: String,
      require: true,
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
    phone_number: {
      type: Number,
      required: true,
    },
    last_login: {
      device: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        required: false,
      },
    },
    login_history: [
      {
        device: {
          type: String,
          required: false,
        },
        date: {
          type: Date,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserSuperAdminSchema",
  UserSuperAdminSchema,
  "user-super-admin"
);
