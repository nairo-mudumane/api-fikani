const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserAdminSchema = new Schema(
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
    phone_number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserAdminSchema",
  UserAdminSchema,
  "user-admin"
);
