const path = require("path");
const multer = require("multer");
const { v4: uidv4 } = require("uuid");
const { formatUrlStr } = require("../utils/url");

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    // accepting file
    callback(null, true);
  } else {
    // rejecting file
    callback(new Error("file extension not supported"), false);
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("uploads"));
  },
  filename: (req, file, callback) => {
    const date = new Date().toISOString().toLowerCase();
    const url = formatUrlStr(file.originalname);
    const filename = url.valid_url;

    callback(null, `${date}_${filename}`);
  },
});

const upload = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 1,
  },
});

module.exports = { upload };
