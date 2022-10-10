const fs = require("fs");

function removeFile(path) {
  fs.unlink(path, (error) => {
    if (error) {
      return;
    }
  });
}

module.exports = removeFile;
