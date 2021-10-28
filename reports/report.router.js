const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const reportController = require("../reports/report.controller");

router.post("/getReportDate", authenticateToken, async (request, response) => {
  const result = await reportController.getReportDate(request);
  return response.json(result);
});

router.post("/getReportMonth", authenticateToken, async (request, response) => {
  const result = await reportController.getReportMonth(request);
  return response.json(result);
});

router.post("/getLastYear", authenticateToken, async (request, response) => {
  const result = await reportController.getReportYear(request);
  return response.json(result);
});

router.post("/getLastDays", authenticateToken, async (request, response) => {
  const result = await reportController.getReportDays(request);
  return response.json(result);
});

router.put("/updateReport", authenticateToken, async (req, res) => {
  const result = await reportController.updateTime(req);
  return res.json(result);
});

router.get("/getAll", async (req, res) => {
  const result = await reportController.getAllReports(req);
  return res.send(result);
});

module.exports = router;
