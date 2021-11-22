const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
  },

  adminName:{
    type:String
  },

  adminEmail:{
    type: String,
    // required: true,
    unique: true,
  },

 adminPassword:{
    type:String
  }

});

const Invite = mongoose.model("inviteData", AdminSchema);
module.exports = Invite;