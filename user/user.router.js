const express = require("express");
const upload = require("../middleware/multer");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("../user/user.controller");

// router.put('/upload',authenticateToken, upload.single("attachments"),userController.uploadImage)

router.post('/signup', async (req, res) => {
    const result = await userController.createUser(req);
    return res.send(result);
})

router.get('/getUser',authenticateToken,async (request, response) => {
    const result = await userController.getUser(request);
    return response.json({ result });
  });

router.post('/login',async(req,res)=>{
    const result=await userController.loginUser(req);
    res.cookie(result.token);
    return res.json({result})
})

router.put('/updateProfile',authenticateToken,async(req,res)=>{
    const result =await userController.updateUser(req);
    return res.json(result)
})

router.put('/updatePassword',authenticateToken,async(req,res)=>{
    const result=await userController.updatePassword(req);
    return res.send(result)
})

router.put('/upload',authenticateToken,upload.single("attachments"),async(req,res)=>{
    const result=await userController.uploadImage(req);
    return res.send(result)
})


router.put('/forgetPassword',authenticateToken,async(req,res)=>{
    const result=await userController.forgotPassword(req);
    return res.send(result)
})

router.get('/auth/verifyEmail/:id',(req,res)=>{
    res.send ("123456")
})

router.get('/getAll',userController.getAllusers)

module.exports = router;


