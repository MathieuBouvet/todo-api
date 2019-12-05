const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const Cookies = require("cookies");

const cookieExtractor = req => {
  return new Cookies(req, null).get("access_token");
};
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: cookieExtractor,
    },
    (jwt_payload, done) => {
      done(null, {
        id: jwt_payload.userId,
        csrfToken: jwt_payload.csrfToken,
      });
    }
  )
);
