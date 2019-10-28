const jwt = require("jsonwebtoken");

const getTokenFromHeader = req => {
  return req.headers.authorization.split(" ")[1];
};

module.exports = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      throw "Invalid token";
    } else {
      req.userId = decodedToken.userId;
      next();
    }
  } catch (err) {
    res.header("WWW-Authenticate", "Bearer");
    res.status(401).json({ error: "Access token is invalid or missing" });
  }
};
