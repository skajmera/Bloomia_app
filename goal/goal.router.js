const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../goal/goal.controller");

router.post("/goalSet", authenticateToken, async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

router.get("/getGoalData", authenticateToken, async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

router.put("/updateGoal", authenticateToken, async (req, res) => {
  const result = await userController.updateUser(req);
  return res.json(result);
});

module.exports = router;

// router.post('/static',()=>{
//     //calender
//     //day check krna
//     //run set and time count
//     //update set and time
// })