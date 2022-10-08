const model = require("../../models/user-admin");
const bcrypt = require("bcryptjs");

const authenticate = async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    const user = await model
      .findOne({ $or: { email: username, name: username } })
      .select("+password");

    if (!user) {
      return response.status(400).json({ message: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response
        .status(400)
        .json({ message: "username or password invalid" });
    }

    return response.status(200).json({ message: "ok", data: user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  authenticate,
};
