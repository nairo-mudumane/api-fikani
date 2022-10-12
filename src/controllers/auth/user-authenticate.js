const model = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const newLoginEmailAlert = require("./new-login-email-alert");
const { removePrivateFields } = require("../../utils/user-admin");

const userAuthenticate = async (request, response) => {
  const device = {
    type: request.device.type,
    name: request.device.name,
  };
  const { username, password } = request.body;
  let user = undefined;

  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    user = await model
      .findOne({ email: username })
      .select("+password")
      .then((result) => {
        if (result) {
          return result._doc;
        }
      });
    if (!user) {
      return response.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

  try {
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response
        .status(400)
        .json({ message: "username or password invalid" });
    } else {
      user = removePrivateFields(user);

      const token = jwt.sign({ _id: user._id }, authConfig.user_secret, {
        expiresIn: 86400,
      });

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
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  userAuthenticate,
};
