const model = require("../../models/exhibitor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const newLoginEmailAlert = require("../../services/new-login-email-alert");
const { removePrivateFields } = require("../../utils/user-admin");
const { isObjectEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

const exhibitorAuthenticate = async (request, response) => {
  const queryParams = request.query;
  const device = request.device;

  if (isObjectEmpty(queryParams)) {
    const { username, password } = request.body;
    let exhibitor = undefined;

    if (!username || !password) {
      return response
        .status(400)
        .json({ message: "username and password are required" });
    }

    try {
      exhibitor = await model
        .findOne({ email: username })
        .select("+password +login_history +last_login")
        .then((result) => {
          if (result) {
            return result._doc;
          }
          return undefined;
        });

      if (!exhibitor) {
        return response.status(404).json({ message: "exhibitor not found" });
      }
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }

    try {
      const isValidPassword = await bcrypt.compare(
        password,
        exhibitor.password
      );

      if (!isValidPassword) {
        return response
          .status(400)
          .json({ message: "username or password invalid" });
      } else {
        const token = jwt.sign(
          { _id: exhibitor._id, key: exhibitor.key },
          authConfig.exhibitor_secret,
          {
            expiresIn: 86400, // 24h
          }
        );

        const email_data = {
          device,
          firstname: exhibitor.firstname,
          lastname: exhibitor.lastname,
          email: exhibitor.email,
        };

        model.findOneAndUpdate(
          { email: username },
          {
            $set: {
              last_login: {
                device: `${device.type}|${device.name}`,
                date: new Date(),
              },
              login_history: [
                ...exhibitor.login_history,
                {
                  device: `${device.type} - ${device.name}`,
                  date: new Date(),
                },
              ],
            },
          }
        );

        exhibitor = removePrivateFields(exhibitor);

        newLoginEmailAlert("user", email_data);

        return response.status(200).json({
          message: "ok",
          data: {
            ...exhibitor,
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
      filters: [],
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const refreshExhibitor = async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.status(401).json({ message: "unauthorized" });
  }

  try {
    let exhibitor = await model
      .findById(user._id)
      .then((doc) => {
        if (!doc) return undefined;
        return doc._doc;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });

    exhibitor = removePrivateFields(exhibitor);

    if (!exhibitor) {
      return response.status(401).json({ message: "not found" });
    }

    return response.status(200).json({ message: "ok", data: exhibitor });
  } catch (error) {
    console.log("error: ", error);
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  exhibitorAuthenticate,
  refreshExhibitor,
};
