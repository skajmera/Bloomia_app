const adminDataAccess = require("./admin.dal");
const userDataAccess = require("../user/user.dal");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/jwt");
require("dotenv").config();
const ExpressError = require("../utils/errorGenerator");
const { myFunction } = require("../utils/nodemailer");

exports.inviteUser = async (req, res) => {
  const adminId=req.token_data._id
  // console.log(adminId);
  const { email } = req.body;
  if (!email) {
    throw new ExpressError(401, "plz enter the  email");
  }
  const data = await userDataAccess.findUserByUsername({ email:email });
  const newData = await adminDataAccess.findEmail({ email:email });
  const admin=await adminDataAccess.findEmail({adminEmail:email})
  // const adminData=await adminDataAccess.findEmail({_id:adminId})
  if (admin) {
    return "this is admin gmail,already registered";
  }
  if (newData) {
    return "already send mail";
  }
  if (!data && !newData) {
    const otpSend = {
      from: process.env.email,//adminData.adminEmail,
      to: email,
      subject: "invite",
      text: "hi user install this app",
    };
    const inviteSend = myFunction(otpSend);
    await adminDataAccess.storeAdmin({ email: email });
    return {
      error: false,
      sucess: true,
      message: "send invite email successfully",
      data: inviteSend,
    };
  }
  return "already registered";
};

exports.createAdmin = async (req) => {
  const {email,password,name} = req.body;
  if (!password || !email || !name) {
    throw new ExpressError(401, "Bad request");
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const data = {
    adminName: name,
    adminEmail:email,
    adminPassword: passwordHash,
  };
  const storedAdmin = await adminDataAccess.storeAdmin(data);
  return {
    error: false,
    sucess: true,
    message: "admin created successfully",
    data: storedAdmin,
  };
};

exports.loginAdmin = async (req, res) => {
  const {email, password } = req.body;
  if (!email || !password) {
    return new ExpressError(
      401,
      "Either username or password is missing in the request."
    );
  }
  const adminData = await adminDataAccess.findEmail({adminEmail:email});
  if (!adminData) {
    return new ExpressError(404, "email not found in the database.");
  }
  const match = bcrypt.compareSync(password, adminData.adminPassword);
  if (!match) {
    return new ExpressError(403, "Invalid password");
  }
  const token = generateAccessToken({ _id: adminData._id });
  return {
    error: false,
    sucess: true,
    message: "login admin successfully",
    data: adminData,
    token,
  };
};  

