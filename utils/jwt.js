const jwt = require("jsonwebtoken");
// const ExpressError=require('../utils/errorGenerator')
function generateAccessToken(username) {
  return jwt.sign({_id: username._id}, "subhash", { expiresIn: "18000s" });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.cookie;
  if(authHeader===undefined){
   return res.send("unauthorized")
  }
  const token = authHeader.split("=")[0];
  // if (token == null) return res.sendStatus(401);
  jwt.verify(token, "subhash", (err, data) => {
    if (err) return res.sendStatus(401);
    req.token_data=data
    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
