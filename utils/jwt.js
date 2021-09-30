const jwt = require("jsonwebtoken");
function generateAccessToken(username) {
  return jwt.sign({_id: username._id}, "subhash", { expiresIn: "18000s" });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.cookie;
  const token = authHeader.split("=")[0];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "subhash", (err, data) => {
    if (err) return res.sendStatus(401);
    req.token_data=data
    next();
  });

  console.log(jwt.verify(token, 'subhash'));
}

module.exports = { generateAccessToken, authenticateToken };
