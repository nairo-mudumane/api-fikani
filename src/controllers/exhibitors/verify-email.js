const model = require("../../models/exhibitor");
const { isObjectEmpty } = require("../../utils/empty");
const queryUtils = require("../../utils/query");

// http://accounts.fikani.com/confirm-email?token=ea0531356b5d88e0021be5d93007766618da467e03081c45cd27dded23c4&utm_email=it.onemediamoz@gmail.com&utm_type=exhibitor&utm_key=onemedia-sa
const verifyEmail = async (request, response) => {
  const query = request.query;
  let exhibitor;

  if (isObjectEmpty(query)) {
    return response.status(400).json({
      message: "search params: [utm_email], [utm_type], [utm_key]. is required",
    });
  }

  try {
    queryUtils.handleQueryKeys(query, {
      filters: ["utm_email", "utm_type", "utm_key", "token"],
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  try {
    exhibitor = await model
      .findOne({ email: query.utm_email })
      .select("+email_token_expires +email_token")
      .then((result) => {
        if (result) {
          return result._doc;
        }
        return undefined;
      });

    if (!exhibitor) {
      return response.status(404).json({ message: "not found" });
    }

    if (exhibitor.token && exhibitor.token !== query.token) {
      return response.status(400).json({ message: "invalid token" });
    }

    const now = new Date();

    if (now > exhibitor.email_token_expires) {
      return response.status(400).json({ message: "token expired" });
    }

    const updated = await model
      .findOneAndUpdate(
        { email: query.utm_email },
        {
          $set: {
            email_token_expires: undefined,
            email_token: undefined,
            email_verified: true,
          },
        }
      )
      .then((result) => {
        if (result) {
          return result._doc;
        }
        return false;
      });

    if (updated) {
      return response.status(200).json({ message: "email confirmed" });
    }

    return response.status(404).json({ message: "not found" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyEmail,
};
