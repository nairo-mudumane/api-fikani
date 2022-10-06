const model = require("../../models/user-super-admin");
const superAdminUtils = require("../../utils/user-super-admin");

const createRootAdmin = async (req, res) => {
  const payload = req.body;

  try {
    superAdminUtils.checkUSerAdminSuper(payload);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const formatted = superAdminUtils.formatUserAdminSuper(payload);

  try {
    const result = await model.create(formatted).then((record) => {
      return record._id;
    });
    return res.status(201).json({
      message: "created",
      data: {
        _id: result,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRootAdmin,
};
