const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const goalController = require("../goal/goal.controller");

router.get("/getGoalData", authenticateToken, async (request, response) => {
  const result = await goalController.getGoal(request);
  return response.json(result);
});

router.put("/updateGoal", authenticateToken, async (req, res) => {
  const result = await goalController.updateGoal(req);
  return res.json(result);
});

module.exports = router;