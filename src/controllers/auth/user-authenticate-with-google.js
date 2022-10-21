const model = require("../../models/user");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const newLoginEmailAlert = require("../../services/new-login-email-alert");
const { removePrivateFields } = require("../../utils/user-admin");

async function authenticateWithGoogle(request, response) {
  let user;
  const { device } = request;
  const { username } = request.body;

  try {
    user = await model
      .findOne({ email: username })
      .select("+login_history +last_login")
      .then((result) => {
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
    const last_login = {
      device: `${device.type}|${device.name}`,
      date: new Date(),
    };

    await model.findOneAndUpdate(
      { email: username },
      {
        ...user,
        last_login,
        login_history: [...user.login_history, last_login],
      }
    );

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
