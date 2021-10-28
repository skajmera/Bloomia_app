const Goal = require("./goal.model");
require("../utils/jwt");

const storeGoal = async (goalToStore) => {
  const storedGoal = await Goal.create(goalToStore);
  return storedGoal;
};

const findGoal = async (data) => {
  const goal = await Goal.find(data);
  return goal;
};

const updateGoal = async (goalData) => {
  const goal = await Goal.findOneAndUpdate(
    goalData._id,
    { $set: goalData.toUpdate },
    { new: true }
  );
  return goal;
};


module.exports = { storeGoal, findGoal,updateGoal };
