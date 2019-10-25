const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(userFound => {
      res.status(200).json(userFound);
    })
    .catch(error => {
      res.status(404).json(error);
    });
};

exports.addUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then(password => new User({ username, password }).save())
    .then(data => {
      res
        .header("Location", req.originalUrl + "/" + data._id)
        .status(201)
        .json({
          message: "User successfully created",
          ressource: data,
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
};
