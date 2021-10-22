const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateAccessToken(username) {
  return jwt.sign({ _id: username._id }, process.env.secret_key, {
    expiresIn: "18000s",
  });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    return res.sendStatus(401).json({ error: true, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.secret_key, (err, data) => {
    if (err)
      return res.status(401).json({ error: true, message: "Unauthorized" });
    req.token_data = data;
    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
