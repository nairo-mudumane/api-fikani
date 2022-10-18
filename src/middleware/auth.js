const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function userAuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "no token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    console.log("parts: ", parts);
    return response.status(401).json({ message: "no token provided" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: "invalid token" });
  }

  return jwt.verify(token, authConfig.user_secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ message: err.message });
    }

    console.log("decoded: ", decoded);
    request.user = {
      ...decoded,
    };

    return next();
  });
}

function adminAuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "no token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length === 2) {
    return response.status(401).json({ message: "no token provided" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: "invalid token" });
  }

  return jwt.verify(token, authConfig.admin_secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ message: "invalid token" });
    }

    request.user = {
      ...decoded,
    };

    return next();
  });
}

module.exports = {
  userAuthMiddleware,
  adminAuthMiddleware,
};
