const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  setTime: {
    type: Number,
  },
  setCount: {
    type: Number,
  },
  creatTime:{
    type:String
  },
  isoDate:{
    type:String
  }
},
{timestamps:true} );

const Report = mongoose.model("reportData", UserSchema);
module.exports = Report;
