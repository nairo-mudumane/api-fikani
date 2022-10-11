const bcrypt = require("bcryptjs");
const model = require("../../models/user");
const modelExhibitor = require("../../models/exhibitor");
const modelUserAdmin = require("../../models/user-admin");
const { formatUrlStr } = require("../../utils/url");
const utils = require("../../utils/user");
const upload = require("../../utils/upload");

const create = async (request, response) => {
  const payload = request.body;
  const file = request.file ? request.file : undefined;
  const filepath = file ? file.path : undefined;
  const filename = formatUrlStr(
    `${payload.firstname}_${payload.lastname}`
  ).valid_url;
  let avatarUrl;
  let formattedUser;

  try {
    utils.checkUserFields(payload);
    const user = await model
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    const exhibitor = false;
    const userAdmin = false;
    // const exhibitor = await modelExhibitor
    //   .findOne({ email: payload.email })
    //   .then((result) => {
    //     if (result && result.email) {
    //       return true;
    //     }
    //     return false;
    //   });

    // const userAdmin = await modelUserAdmin
    //   .findOne({ email: payload.email })
    //   .then((result) => {
    //     if (result && result.email) {
    //       return true;
    //     }
    //     return false;
    //   });

    if (user || exhibitor || userAdmin) {
      if (file) {
        removeFile(file.path);
      }

      throw new Error(`path: email [${payload.email}] already taken`);
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  if (file && filepath) {
    try {
      avatarUrl = await upload.uploadSingleFile(
        "users/avatar",
        filepath,
        filename
      );
    } catch (error) {
      return response.status(500).json({ message: "failed to upload avatar" });
    }
  }

  try {
    formattedUser = utils.formatUser(payload);

    const hashedPassword = await bcrypt.hash(formattedUser.password, 10);
    formattedUser.password = hashedPassword;

    const createdUser = await model.create(formattedUser).then((result) => {
      return result._doc;
    });

    // todo: send email

    return response.status(201).json({
      message: "created",
      data: {
        _id: createdUser._id,
        key: createdUser.key,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = { create };
