const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.login = (req, res) => {
  const { username, password } = req.body;
  let loggedInUser = null;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      loggedInUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(valid => {
      if (!valid) {
        return Promise.reject();
      }
      const token = jwt.sign(
        { userId: loggedInUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res
        .status(200)
        .json({
          user: loggedInUser._id,
          token,
          username: loggedInUser.username,
        });
    })
    .catch(() => {
      res.status(401).json({ error: "Invalid Credentials" });
    });
};
