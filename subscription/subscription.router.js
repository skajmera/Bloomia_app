const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const subscriptionController = require("../subscription/subscription.controller");

router.post("/payment", async (req, res) => {
  const result = await subscriptionController.payment(req);
  return res.json(result);
});



router.post("/product", async (req, res) => {
    const result = await subscriptionController.createProduct(req);
    return res.json(result);
  });

  
router.post("/cancleSub", async (req, res) => {
  const result = await subscriptionController.cancleSubscription(req.body);
  return res.json(result);
});


module.exports = router;

