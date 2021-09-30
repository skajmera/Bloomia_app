const userModel = require("../user/user.model");
const path=require('path')
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/jwt");

exports.createUser = (req, res) => new Promise(async (resolve, reject) => {
  try {
    var password = bcrypt.hashSync(req.body.password, 10);
    const data = new userModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact: req.body.number,
      email: req.body.email,
      password: password
    });
    const newUser = await data.save();
    if (newUser) {
      return resolve({ message: "user created" });
    }
  } catch (error) {
    return reject(error);
  }
});

exports.loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (match) {
      const token = generateAccessToken({ _id: user._id });
      res.cookie(token);
      res.send("login successfully");
    } else {
      res.send("password incorrect");
    }
  } catch (err) {
    res.send("user not found");
  }
};

exports.updateUser = async (req, res) => {
  try {
    var _id = req.token_data._id;
    await userModel.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          contact: req.body.number,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        },
      }
    );
    res.send("updated user successfully");
  } catch (err) {
    res.send(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    var password = bcrypt.hashSync(req.body.password, 10);
    var _id = req.token_data._id;
    await userModel.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          password: password,
        },
      }
    );
    res.send("updated password successfully");
  } catch (err) {
    res.send(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await userModel.finuserModelyId(req.token_data._id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if(!req.file) {
      res.send(new ExpressError(400, 'Bad request'));
    }
    const image = '/uploads/' + req.file.filename
    const _id= req.token_data;
    const updatedProfile = await userModel.findByIdAndUpdate(req.token_data._id,
      { $set: { profileImage: image } },
      { new: true }
    );
    res.send({
      error: false,
      sucess: true,
      message: 'Uploaded Sucessfully',
      data: updatedProfile
    });
  } catch (err) {
    res.send(new ExpressError(500, 'Something went wrong'));
  }
};

exports.getAllusers = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};


class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message
  }
}
