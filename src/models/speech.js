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
    year: {
      type: Number,
      required: false,
      default: new Date().getFullYear(),
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

module.exports = mongoose.model(
  "OpeningSpeechModel",
  OpeningSpeech,
  "opening-speech"
);
