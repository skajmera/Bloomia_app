const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const subscriptionController = require("../subscription/subscription.controller");

router.get("/getSubscription",(  async (request, response) => {
  const result = await subscriptionController.getSubscription(request);
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





module.exports = router; 

