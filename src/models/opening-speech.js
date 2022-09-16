const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  url_id: {
    type: String,
    required: false,
  },
});

const OpeningSpeech = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    video: {
      type: VideoSchema,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OpeningSpeech", OpeningSpeech);
