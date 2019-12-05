const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookie = require("cookies");
const uid = require("uid-safe");

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

exports.passportLogin = (req, res) => {
  uid(18)
    .then(csrfToken => {
      const token = jwt.sign(
        {
          userId: req.user._id,
          csrfToken,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      new Cookie(req, res).set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({
        user: req.user._id,
        username: req.user.username,
        csrfToken,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
