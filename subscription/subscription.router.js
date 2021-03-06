const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const subscriptionController = require("../subscription/subscription.controller");

router.get("/todayTotalAmount",(  async (request, response) => {
  const result = await subscriptionController.getTotalAmountToday(request);
  return response.json(result);
}));

router.delete("/deletePlan", ( async (request, response) => {
  const result = await subscriptionController.deletePlan(request);
  return response.json(result);
}));

router.post("/payment", async (req, res) => {
  const result = await subscriptionController.payment(req);
  return res.json(result);
});

router.post("/product", async (req, res) => {
    const result = await subscriptionController.createProduct(req);
    return res.json(result);
  });

router.post("/cancleSub", async (req, res) => {
  const result = await subscriptionController.cancleSubscription(req);
  return res.send(result);
});

router.get("/getLastYear", async (request, response) => {
  const result = await subscriptionController.getReportYear(request);
  return response.json(result);
});

router.get("/getLast30Days",async (request, response) => {
  const result = await subscriptionController.getReportDays(request);
  return response.json(result);
});

router.get("/getReportWeekly",async (request, response) => {
  const result = await subscriptionController.getReportWeekly(request);
  return response.json(result);
});

router.get("/getReportLast6Month",async (request, response) => {
  const result = await subscriptionController.getReport6Month(request);
  return response.json(result);
});

router.get("/totalAmountWeekly",async (request, response) => {
  const result = await subscriptionController.getTotalAmountWeekly(request);
  return response.json(result);
});

router.get("/getLast30DaysTotalAmount",async (request, response) => {
  const result = await subscriptionController.get30DaysTotalAmountDays(request);
  return response.json(result);
});

router.get("/getLastYearAmount", async (request, response) => {
  const result = await subscriptionController.getAmountYear(request);
  return response.json(result);
});

module.exports = router; 
