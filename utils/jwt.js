const jwt = require("jsonwebtoken");
require('dotenv').config();
function generateAccessToken(username) {
  return jwt.sign({_id: username._id}, process.env.secret_key, { expiresIn: "18000s" });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.cookie;
  if(authHeader===undefined){
   return res.send("unauthorized")
  }
  const token = authHeader.split("=")[0];
  jwt.verify(token, process.env.secret_key, (err, data) => {
    if (err) return res.sendStatus(401);
    req.token_data=data
    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
