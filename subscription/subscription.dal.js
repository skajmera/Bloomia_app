const Subscription = require("./subscription.model");
require("../utils/jwt");

const storeData = async (subscriptionToStore) => {
  const data = await Subscription.create(subscriptionToStore);
  return data;
};

const findSub = async (data) => {
  const reports = await Subscription.find(data);
  return reports;
};

// const delPlan = async (req) => {
//   const deleteData=await stripe.plans.del(
//     req.body.priceId
//   )
//   return deleteData
// };




module.exports = { storeData,findSub};
