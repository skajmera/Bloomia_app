const express = require("express");
const router = express.Router();
const adminController = require("../admin/admin.controller");
const { authenticateToken } = require("../utils/jwt");


router.post("/inviteUser",authenticateToken, async (req, res) => {
  const result = await adminController.inviteUser(req);
  return res.send(result);
});

router.post("/signUp", async (req, res) => {
  const result = await adminController.createAdmin(req);
  return res.send(result);
});

router.post("/login", async (req, res) => {
  const result = await adminController.loginAdmin(req);
  return res.json(result);
});

module.exports = router;

