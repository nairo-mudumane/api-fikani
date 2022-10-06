function generateAccessKey(length) {
  if (length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result =
        result +
        characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = {
  generateAccessKey,
};
