const fs = require("fs");

function removeFile(path) {
  console.log(path);
  fs.unlink(path, (error) => {
    if (error) {
      console.error(error);
      return;
    }
  });
}

module.exports = removeFile;
