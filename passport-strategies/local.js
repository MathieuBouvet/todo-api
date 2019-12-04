const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, done) => {
      User.findOne({ username })
        .then(user => {
          return Promise.all([
            user,
            user ? bcrypt.compare(user.password, password) : false,
          ]);
        })
        .then(([user, validPassword]) => {
          return done(null, validPassword ? user : false);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);
