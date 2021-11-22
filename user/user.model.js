const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  reminderTime: {
    type: String,
  },
  dailyReminder:{
    type: String,
  },
  newDate: {
    type: String,
  },
  endDate: {
    type: String,
    index: true,
  },
  subject: {
    type: String,
  },
  text: {
    type: String,
  },

  // subscriptionId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'subscription'
  // },

  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  timezone: {
    type: String,
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
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  inviteLink:{
    type:Boolean
  }
});

const User = mongoose.model("UserData", UserSchema);
module.exports = User;
