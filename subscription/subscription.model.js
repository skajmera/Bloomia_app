const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  address: {
    type: String,
  },
  name: {
    type: String,
  },
  stripeEmail:{
    type:String
  },
  subId:{
    type:String
  },
  priceId:{
    type:String
  },
  createTime:{
    type:String
  },
  isoDate:{
    type:String
  }
} );

const Subscription = mongoose.model("subscription", subscriptionSchema);
module.exports = Subscription;
