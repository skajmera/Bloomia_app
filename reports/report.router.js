const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../reports/report.controller");

router.post("/setReport", authenticateToken, async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

router.get("/getReportData", authenticateToken, async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

module.exports = router;
