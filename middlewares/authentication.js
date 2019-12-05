const passport = require("passport");
require("../passport-strategies/jwt");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};
