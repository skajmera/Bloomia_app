const adminDataAccess = require("./admin.dal");
const userDataAccess = require("../user/user.dal");

require("dotenv").config();
const ExpressError = require("../utils/errorGenerator");
const { myFunction } = require("../utils/nodemailer");

exports.inviteUser = async (req, res) => {
    const {email} = req.body;
    if (!email) {
      throw new ExpressError(401, "plz enter the  email");
    }
    const data = await userDataAccess.findUserByUsername({email});
    const newData = await adminDataAccess.findEmail({email});

    if(!data && !newData){
      const otpSend = {
      from: process.env.email,
      to: email,
      subject: "invite",
      text: "hi user install this app",
    };
    const inviteSend=myFunction(otpSend);
    await adminDataAccess.storeAdmin({email:email})
    return {
      error: false,
      sucess: true,
      message: "send invite email successfully",
      data: inviteSend,
    };
    }
    return "already registered"
  };
  