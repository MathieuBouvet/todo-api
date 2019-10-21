const User = require("../models/user");

exports.getUser = (req, res) => {
  User.findOne({
    _id: req.params.id,
  })
    .then(userFound => {
      res.status(200).json(userFound);
    })
    .catch(error => {
      res.status(404).json(error);
    });
};
