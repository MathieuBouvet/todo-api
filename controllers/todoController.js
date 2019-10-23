const User = require("../models/user");

exports.updateTodo = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.todos = req.body;
      return user.save();
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json(error);
    });
};
