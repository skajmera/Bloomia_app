const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../goal/goal.controller");

router.post("/goalSet", authenticateToken, async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

router.get("/getUserData", authenticateToken, async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

module.exports = router;
