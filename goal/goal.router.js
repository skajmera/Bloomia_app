const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../goal/goal.controller");

router.get("/getGoalData", authenticateToken, async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

router.put("/updateGoal", authenticateToken, async (req, res) => {
  const result = await userController.updateUser(req);
  return res.json(result);
});

module.exports = router;