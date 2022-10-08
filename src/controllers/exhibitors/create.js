const model = require("../../models/exhibitor");
const utils = require("../../utils/exhibitor");
const { formatUrlStr } = require("../../utils/url");
const upload = require("../../utils/upload");

const create = async (request, response) => {
  const payload = request.body;
  const file = request.file ? request.file : undefined;
  const filepath = file ? file.path : undefined;
  const filename = formatUrlStr(payload.name).valid_url;
  let avatarUrl;
  let formattedExhibitor;
  let idInserted;

  try {
    utils.checkExhibitorFields(payload);
    const isEmailTaken = await model
      .findOne({ email: payload.email })
      .then((result) => {
        if (result && result.email) {
          return true;
        }
        return false;
      });

    if (isEmailTaken) {
      throw new Error(`path: email [${payload.email}] already taken`);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (file && filepath) {
    try {
      avatarUrl = await upload.uploadSingleFile(
        "exhibitors/avatar",
        filepath,
        filename
      );
    } catch (error) {
      return res.status(500).json({ message: "failed to upload avatar" });
    }
  }

  formattedExhibitor = utils.formatExhibitor({
    ...payload,
    avatar: avatarUrl,
  });

  try {
    idInserted = await model.create(formattedExhibitor).then((result) => {
      return result._id;
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // send email

  return res.status(201).json({
    ...formattedExhibitor,
    avatarUrl,
    file,
    filepath,
    filename,
  });
};

module.exports = create;
