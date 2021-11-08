const Subscription = require("./subscription.model");
require("../utils/jwt");

const storeData = async (subscriptionToStore) => {
  const data = await Subscription.create(subscriptionToStore);
  return data;
};

// const findReport = async (data) => {
//   const reports = await Subscription.find(data);
//   return reports;
// };

// const updateTime = async (reportData) => {
//   const reports = await Subscription.findOneAndUpdate(
//     { creatTime: reportData.creatTime },
//     reportData.toUpdate,
//     { new: true }
//   );
//   return reports;
// };

// const findAll = async () => {
//   const reports = await Subscription.find({});
//   return reports;
// };                                                                                 

module.exports = { storeData};
