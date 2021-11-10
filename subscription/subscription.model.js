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
  subscriptionId:{
    type:String
  },
  priceId:{
    type:String
  }
} );

const Subscription = mongoose.model("subscription", subscriptionSchema);
module.exports = Subscription;
