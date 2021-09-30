const express = require("express");
const upload = require("../middleware/multer");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../user/user.controller");
const { response } = require("express");

// router.post("/signup", userController.createUser);
router.put("/updateProfile", authenticateToken, userController.updateUser);
router.put('/updatePassword',authenticateToken,userController.updatePassword)
router.post("/login", userController.loginUser);
router.get("/getUser", authenticateToken, userController.getUser);
router.put('/upload',authenticateToken, upload.single("attachments"),userController.uploadImage)

router.post('/signup', async (req, res) => {
    try {
        const result = await userController.createUser(req, res);
        res.send(result);
    } catch (e) {
        res.send({error: true, success: false, message: e.message})
    }
})

router.get('/getAll',userController.getAllusers)

module.exports = router;

