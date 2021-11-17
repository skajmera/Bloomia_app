const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

const Invite = mongoose.model("inviteData", AdminSchema);
module.exports = Invite;
