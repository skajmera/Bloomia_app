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
    {userId:goalData._id},
    { $set: goalData.toUpdate },
    { new: true }
  );
  return goal;
};

const streakSet = async (streakData) => {
  const goal = await Goal.findOneAndUpdate(
    {adminId:streakData._id},
    { $set: streakData.toUpdate },
    { new: true }
  );
  return goal;
};


const deAll=async()=>{
    const user=await Goal.remove({})
    console.log(user)
  }
// deAll()

module.exports = { storeGoal, findGoal,updateGoal,streakSet };
