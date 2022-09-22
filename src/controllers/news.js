const create = (req, res) => {
  return res.json({ name: req.file.filename, ...req.body });
};

module.exports = {
  create,
};
