const model = require("../../models/exhibitor");
const { isObjectEmpty } = require("../../utils/empty");
const passwordUtils = require("../../utils/password");
const queryUtils = require("../../utils/query");

const getAll = async (req, res) => {
  const queryParams = req.query;
  const noPasswordExhibitors = [];

  if (isObjectEmpty(queryParams)) {
    try {
      const exhibitors = await model
        .find()
        .sort({ createdAt: 1 })
        .then((results) => {
          return results;
        });

      exhibitors.forEach((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      const totalResults = noPasswordExhibitors.length;

      return res
        .status(200)
        .json({ message: "ok", totalResults, data: noPasswordExhibitors });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  try {
    const queryFilters = queryUtils.handleQueryKeys(queryParams, {
      filters: ["category", "is_active", "is_buyer"],
    });

    const queryCategory = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "category") {
          return field[key];
        }
      });
    });

    const queryIsActive = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "is_active") {
          return field[key];
        }
      });
    });

    const queryIsBuyer = queryFilters.find((field) => {
      return Object.keys(field).find((key) => {
        if (key === "is_buyer") {
          return field[key];
        }
      });
    });

    if (queryCategory && queryIsActive && queryIsBuyer) {
      const filteredExhibitors = await model.find({
        $and: [
          { category: { $regex: queryCategory.category, $options: "i" } },
          { is_active: queryIsActive.is_active },
          { is_buyer: queryIsBuyer.is_buyer },
        ],
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryCategory && queryIsActive) {
      const filteredExhibitors = await model.find({
        $and: [
          { category: { $regex: queryCategory.category, $options: "i" } },
          { is_active: queryIsActive.is_active },
        ],
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryCategory && queryIsBuyer) {
      const filteredExhibitors = await model.find({
        $and: [
          { category: { $regex: queryCategory.category, $options: "i" } },
          { is_buyer: queryIsBuyer.is_buyer },
        ],
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryIsActive && queryIsBuyer) {
      const filteredExhibitors = await model.find({
        $and: [
          { is_active: queryIsActive.is_active },
          { is_buyer: queryIsBuyer.is_buyer },
        ],
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryCategory) {
      const filteredExhibitors = await model.find({
        category: { $regex: queryCategory.category, $options: "i" },
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryIsActive) {
      const filteredExhibitors = await model.find({
        is_active: queryIsActive.is_active,
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    } else if (queryIsBuyer) {
      const filteredExhibitors = await model.find({
        is_buyer: queryIsBuyer.is_buyer,
      });

      filteredExhibitors.map((exhibitor) => {
        const formatted = passwordUtils.removePasswordField(exhibitor._doc);
        noPasswordExhibitors.push(formatted);
      });

      return res.status(200).json({
        message: "ok",
        totalResults: noPasswordExhibitors.length,
        data: noPasswordExhibitors,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAll;
