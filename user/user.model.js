const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  reminderTime:{
    type:String
  },
  newDate:{
    type:String
  },
  endDate:{
    type:String,
    index:true
  },
  isVerified:{
    type:Boolean,
    default: false
  },
  profileImage: {
    type: String,
  },
  mailSent: {
    type: Boolean,
    default: false
  },

  timezone:{
    type:String
  },

  first_name: {
    type: String,
  },

  last_name: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("UserData", UserSchema);
module.exports = User;
