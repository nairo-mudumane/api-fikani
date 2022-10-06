const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserAdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url_key: {
      type: String,
      required: false,
    },
    access_key: {
      type: String,
      required: false,
    },
    access_token: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    last_login: {
      type: String,
      require: false,
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
  "UserAdminSchema",
  UserAdminSchema,
  "user-admins"
);
