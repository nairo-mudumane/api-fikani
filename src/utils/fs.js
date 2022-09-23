const fs = require("fs");

async function removeFile(path) {
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

module.exports = removeFile;
