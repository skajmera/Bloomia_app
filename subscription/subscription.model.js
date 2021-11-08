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
  stripeToken:{
    type:String
  },
  customerId:{
      type:String
  },
  cardId:{
    type:String
  },
  cardNumber:{
    type:String
  },
  cvc:{
    type:Number
  },
  expMonth:{
    type:String
  },
  expYear:{
    type:String
  },
  description:{
    type:String
  }
} );

const Subscription = mongoose.model("subscription", subscriptionSchema);
module.exports = Subscription;
