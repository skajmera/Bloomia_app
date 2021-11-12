const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  setType: {
    type: String,
  },
  userId: {
    type: String,
  },
  set: {
    type: Number,
  },
  setting:{
    type:String
  },
  totalTime:{
    type:String
  },
  adminId:{
    type:String
  }
});

const Goal = mongoose.model("adminData", UserSchema);
module.exports = Goal;
