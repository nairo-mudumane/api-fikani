const { v4: uidv4 } = require("uuid");
const { mediaStorage } = require("../config/storage");
const removeFile = require("./fs");

async function uploadSingleFile(destination, filepath, filename) {
  try {
    const storage = await mediaStorage
      .upload(filepath, {
        public: true,
        destination: `/${destination}/${filename}`,
        metadata: {
          firebaseStorageDownloadTokens: uidv4(),
        },
      })
      .then((response) => {
        console.log("filepath: ", filepath);
        removeFile(filepath);
        return response;
      });

    return storage[0].metadata.mediaLink;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function uploadMultipleFiles(paths, filenames) {
  try {
    const promises = paths.map(async (path, index) => {
      return this.uploadFile(path, filenames[index]);
    });

    return Promise.all(promises);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function deleteSingleFile(filename) {
  try {
    const result = await mediaStorage.delete(filename);
    console.log(result);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteSingleFile,
};
