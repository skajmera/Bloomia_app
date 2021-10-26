const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../reports/report.controller");

router.get("/getReportDate", authenticateToken, async (request, response) => {
  const result = await userController.getReportDate(request);
  return response.json(result);
});

router.get("/getReportMonth", authenticateToken, async (request, response) => {
  const result = await userController.getReportMonth(request);
  return response.json(result);
});


router.get("/getLastYear", authenticateToken, async (request, response) => {
  const result = await userController.getReportYear(request);
  return response.json(result);
});


router.put("/updateReport", authenticateToken, async (req, res) => {
  const result = await userController.updateTime(req);
  return res.json(result);
});

router.get("/getAll", async (req, res) => {
  const result = await userController.getAllusers(req);
  return res.send(result);
});

module.exports = router;
