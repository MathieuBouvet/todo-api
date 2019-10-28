const authentication = require("./authentication");

module.exports = (req, res, next) => {
  authentication(req, res, () => {
    if (req.userId === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Only the author can modify this ressource" });
    }
  });
};
