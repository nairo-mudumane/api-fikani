const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function userAuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "unauthorized" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  return jwt.verify(token, authConfig.user_secret, (err, decoded) => {
    if (err) {
      return response.status(498).json({ message: "invalid token" });
    }

    const now = new Date();
    if (now > decoded.exp) {
      return response.status(498).json({ message: "token expired" });
    }

    request.user = {
      _id: decoded._id,
    };

    return next();
  });
}

function adminAuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "unauthorized" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  return jwt.verify(token, authConfig.admin_secret, (err, decoded) => {
    if (err) {
      return response.status(498).json({ message: "invalid token" });
    }

    const now = new Date();
    if (now > decoded.exp) {
      return response.status(498).json({ message: "token expired" });
    }

    request.user = {
      _id: decoded._id,
    };

    return next();
  });
}

function exhibitorAuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "unauthorized" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(498).json({ message: "invalid token structure" });
  }

  return jwt.verify(token, authConfig.exhibitor_secret, (err, decoded) => {
    if (err) {
      return response.status(498).json({ message: "invalid token" });
    }

    const now = new Date();
    if (decoded.exp < now.getTime() / 1000) {
      return response.status(498).json({ message: "token expired" });
    }

    request.user = {
      _id: decoded._id,
    };

    return next();
  });
}

module.exports = {
  userAuthMiddleware,
  adminAuthMiddleware,
  exhibitorAuthMiddleware,
};
