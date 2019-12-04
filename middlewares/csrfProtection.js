module.exports = (req, res, next) => {
  if (req.csrfTokenFromJwt === req.headers["x-csrf-token"]) {
    next();
  } else {
    res.status(403).json({ error: "Invalid csrf token" });
  }
};
