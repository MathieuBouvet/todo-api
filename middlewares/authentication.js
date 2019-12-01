const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

const getTokenFromCookie = (req, res) => {
  return new Cookies(req, res).get("access_token");
};

module.exports = (req, res, next) => {
  try {
    const token = getTokenFromCookie(req, res);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      throw "Invalid token";
    } else {
      req.userId = decodedToken.userId;
      next();
    }
  } catch (err) {
    res.header("WWW-Authenticate", "Cookie");
    res.status(401).json({ error: "Access token is invalid or missing" });
  }
};
