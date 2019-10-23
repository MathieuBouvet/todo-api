const User = require("../models/user");

exports.updateTodo = (req, res) => {
  // Look for user with given ID
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        // ID given in uri does not match any existing user, we reject this promise
        return Promise.reject("no result");
      }
      // a user has been found, we update its todo list with the given json object from the request body
      user.todos = req.body;
      // we return the saving of this user as a promise, for chaining purposes
      return user.save();
    })
    .then(() => {
      // saving is OK, our job is done here.
      res.status(204).end();
    })
    .catch(error => {
      if (error === "no result") {
        // catching our rejected promise where no user was found for the given id
        res.status(404).json({ message: "ressource not found" });
      }
      // all purpose error catching
      res.status(400).json(error);
    });
};
