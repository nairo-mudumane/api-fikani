const model = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const newLoginEmailAlert = require("../../services/new-login-email-alert");
const { removePrivateFields } = require("../../utils/user-admin");
const DeviceDetector = require("node-device-detector");
const { authenticateWithGoogle } = require("./user-authenticate-with-google");
const { isObjectEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

const userAuthenticate = async (request, response) => {
  const queryParams = request.query;
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

  if (isObjectEmpty(queryParams)) {
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
        return response.status(404).json({ message: "user not found" });
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
      }
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  /**
   * with query params
   */

  try {
    const queryFilters = queryUtils.handleQueryKeys(queryParams, {
      filters: ["type"],
    });

    const typeGoogle = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (field[key].toLowerCase() === "google") {
          return true;
        }
      });
    });

    if (typeGoogle) {
      return authenticateWithGoogle(request, response);
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  userAuthenticate,
};
