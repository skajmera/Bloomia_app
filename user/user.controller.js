const usersDataAccess = require("./user.dal");
const bcrypt = require("bcrypt");
const momen = require("moment-timezone");
require("dotenv").config();
const ExpressError = require("../utils/errorGenerator");
const { generateAccessToken } = require("../utils/jwt");
const { myFunction } = require("../utils/nodemailer");

exports.getUser = async (req) => {
  const _id = req.token_data._id;
  const users = await usersDataAccess.findUser({ _id: _id });
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
  };
};

exports.createUser = async (req) => {
  const { email, password, first_name, last_name, contact } = req.body;
  if (!password || !email || !first_name || !last_name || !contact) {
    throw new ExpressError(401, "Bad request");
  }
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const data = {
    profileImage: "uploads/1633780506772defaultImage.jpg",
    isVerified: false,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dailyReminder: "false",
    reminderTime: "00",
    contact: req.body.contact,
    email: req.body.email,
    password: passwordHash,
  };
  const storedUser = await usersDataAccess.storeUser(data);
  const otpSend = {
    from: process.env.email,
    to: storedUser.email,
    subject: "Sending email using node.js",
    text: `http://localhost:3001/Resetpassword/${storedUser._id}`,
  };
  myFunction(otpSend);
  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  };
};

exports.createUserByLink = async (req) => {
  const { email, password, first_name, last_name, contact } = req.body;
  if (!password || !email || !first_name || !last_name || !contact) {
    throw new ExpressError(401, "Bad request");
  }
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const data = {
    profileImage: "uploads/1633780506772defaultImage.jpg",
    isVerified: false,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    inviteLink:true,
    dailyReminder: "false",
    reminderTime: "00",
    contact: req.body.contact,
    email: req.body.email,
    password: passwordHash,
  };
  const storedUser = await usersDataAccess.storeUser(data);
  const otpSend = {
    from: process.env.email,
    to: storedUser.email,
    subject: "Sending email using node.js",
    text: `http://localhost:3001/Resetpassword/${storedUser._id}`,
  };
  myFunction(otpSend);
  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  };
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new ExpressError(
      401,
      "Either username or password is missing in the request."
    );
  }
  const userData = await usersDataAccess.findUserByUsername({
    email: req.body.email,
  });
  if (!userData) {
    return new ExpressError(404, "email not found in the database.");
  }
  const match = bcrypt.compareSync(req.body.password, userData.password);
  if (!match) {
    return new ExpressError(403, "Invalid password");
  }
  const token = generateAccessToken({ _id: userData._id });
  return {
    error: false,
    sucess: true,
    message: "login user successfully",
    data: userData,
    token,
  };
};

exports.updateUser = async (req, res) => {
  const _id = req.token_data._id;
  const updateData = {
    _id,
    toUpdate: {
      contact: req.body.contact,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    },
  };
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated user successfully",
    data: update,
  };
};

exports.updatePassword = async (req, res) => {
  const _id = req.token_data._id;
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    throw new ExpressError(401, "plz enter the  password or newPassword");
  }
  const userData = await usersDataAccess.findUser({
    _id: _id,
  });
  const match = bcrypt.compareSync(password, userData.password);
  if (!match) {
    return new ExpressError(403, "Your Old Password is Invalid");
  }
  const passwordd = bcrypt.hashSync(newPassword, 10);
  const updateData = {
    _id,
    toUpdate: {
      password: passwordd,
    },
  };
  const updatePass = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated password successfully",
    data: updatePass,
  };
};

exports.uploadImage = async (req, res) => {
  const _id = req.token_data._id;
  let image;
  if (!req.file) {
    image = "uploads/1633780506772defaultImage.jpg";
  } else {
    image = "/uploads/" + req.file.filename;
  }
  const updateImage = {
    _id,
    toUpdate: {
      profileImage: image,
    },
  };
  const updatedProfile = await usersDataAccess.updateUser(updateImage);
  return {
    error: false,
    sucess: true,
    message: "Uploaded Image Sucessfully",
    data: updatedProfile,
  };
};

exports.getAllusers = async (req, res) => {
  const users = await usersDataAccess.findAll();
  return {
    error: false,
    sucess: true,
    message: "Get all users Sucessfully",
    data: users,
  };
};

exports.getId = async (req, res) => {
  res.send(req.params._id);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return new ExpressError(401, "Either email is missing in the request.");
  }
  const userData = await usersDataAccess.findUserByUsername({
    email: req.body.email,
  });
  if (!userData) {
    return new ExpressError(404, "email does not exists");
  }
  const otpSend = {
    from: process.env.email,
    to: userData.email,
    subject: "Sending email using node.js",
    text: `http://localhost:3001/Resetpassword/${userData._id}`,
  };
  myFunction(otpSend);
  return {
    error: false,
    sucess: true,
    message: "forgot password email send successfully",
    data: userData,
  };
};

exports.verifyEmail = async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new ExpressError(401, "plz enter the  _id");
  }
  const updateData = {
    _id,
    toUpdate: {
      isVerified: true,
    },
  };
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "email is verified successfully",
    verify: update,
  };
};

exports.resetPassword = async (req, res) => {
  const { _id, newPassword } = req.body;
  if (!_id || !newPassword) {
    throw new ExpressError(401, "plz enter the  _id or newPassword");
  }
  const password = bcrypt.hashSync(newPassword, 10);
  const updateData = {
    _id,
    toUpdate: {
      password: password,
    },
  };
  const updatePass = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "reset password successfully",
    data: updatePass,
  };
};

exports.reminderTime = async (req, res) => {
  const { dailyReminder, subject, text, timezone, reminderTime } = req.body;
  if (!dailyReminder || !subject || !text || !timezone || !reminderTime) {
    throw new ExpressError(401, "Bad request");
  }
  const _id = req.token_data._id;
  const updateData = {
    _id,
    toUpdate: {
      subject: req.body.subject,
      dailyReminder: dailyReminder,
      text: req.body.text,
      timezone: req.body.timezone,
      newDate: momen().tz(req.body.timezone).format("YYYY-MM-DD HH:mm:ss ZZ"),
      endDate: momen().tz(req.body.timezone).format(`${req.body.reminderTime}`),
      reminderTime: req.body.reminderTime,
    },
  };
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated reminderTime successfully",
    data: update,
  };
};

const loginU = async (email) => {
  const data = await usersDataAccess.findUserByUsername({
    email,
  });
  const token = generateAccessToken({ _id: data._id });
  return {
    error: false,
    sucess: true,
    message: "login google oauth successfully",
    data: data,
    token,
  };
};

exports.success = async (req, res) => {
  try {
    const oauth = req.user;
    const userData = await usersDataAccess.findUserByUsername({
      email: oauth.email,
    });
    if (!userData) {
      const data = {
        profileImage: "uploads/1633780506772defaultImage.jpg",
        isVerified: false,
        first_name: oauth.given_name,
        last_name: oauth.family_name,
        email: oauth.email,
      };
      await usersDataAccess.storeUser(data);
    }
    return loginU(oauth.email);
  } catch (err) {
    return new ExpressError(500, err.message);
  }
};

// const deAll=async()=>{
//     // const user=await User.remove({})
//     const data = await usersDataAccess.deleteAll();
//     console.log(data)
//   }
// deAll()
//

