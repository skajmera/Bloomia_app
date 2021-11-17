const express = require("express");
const router = express.Router();
const userController = require("../admin/admin.controller");


router.post("/inviteUser", async (req, res) => {
    const result = await userController.inviteUser(req);
    return res.send(result);
  });

  module.exports = router;
  