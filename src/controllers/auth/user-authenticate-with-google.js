const model = require("../../models/user");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const newLoginEmailAlert = require("../../services/new-login-email-alert");
const { removePrivateFields } = require("../../utils/user-admin");
const DeviceDetector = require("node-device-detector");

async function authenticateWithGoogle(request, response) {
  let user;
  const { username } = request.body;
  const userAgent = request.get("User-Agent");
  const deviceDetector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  const detector = deviceDetector.detect(userAgent);

  const device = {
    type: detector.device.type,
    name: detector.os.name,
  };

  try {
    user = await model.findOne({ email: username }).then((result) => {
      if (result) {
        return result._doc;
      }
    });

    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

  try {
    user = removePrivateFields(user);

    const token = jwt.sign(
      { _id: user._id, key: user.key },
      authConfig.user_secret,
      {
        expiresIn: 86400,
      }
    );

    const email_data = {
      device,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    await newLoginEmailAlert("user", email_data);

    return response.status(200).json({
      message: "ok",
      data: {
        ...user,
        token,
      },
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

module.exports = {
  authenticateWithGoogle,
};
