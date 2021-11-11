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

// const deleteSub = async () => {
//   const delet= await Subscription.deleteOne({});
//   return delet
// };                                                                                 


module.exports = { storeData,findSub};
