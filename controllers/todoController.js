const User = require("../models/user");

exports.updateTodo = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return Promise.reject("no result");
      }
      user.todos = req.body;
      return user.save();
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      if (error === "no result") {
        res.status(404).json({ message: "ressource not found" });
      }
      res.status(400).json(error);
    });
};
