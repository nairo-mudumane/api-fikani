const model = require("../../models/speech");

const create = async (req, res) => {
  const payload = req.body;

  if (!payload) {
    return res.status(400).json({ message: "no data provided" });
  }

  try {
    const providedYear = payload.year ? payload.year : new Date().getFullYear();
    payload["year"] = providedYear;
    const pastSpeeches = await model.findOne({ year: payload.year });

    if (pastSpeeches && pastSpeeches.year === payload.year) {
      throw new Error();
    } else {
      try {
        const result = await model.create(payload);

        return res
          .status(201)
          .json({ message: "created", data: { _id: result.id } });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: `can not duplicate years. ${payload.year} already registered.`,
    });
  }
};

module.exports = create;
