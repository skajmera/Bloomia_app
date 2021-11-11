const goalDataAccess = require("./goal.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.updateGoal = async (req) => {
    const {totalGoalTime,set,setType} = req.body;
    // if (!set || !setType || !totalGoalTime) {
    //   throw new ExpressError(401, "Bad request");
    // }
    const _id =req.token_data._id;
    const updateData = {
      _id,
      toUpdate: {
        set:set,
        totalTime:totalGoalTime,
        setType:setType
      },
    };
    const update = await goalDataAccess.updateGoal(updateData);
    if(!update){
      const data = {
        set:set,
        setType:setType,
        userId:_id,
        totalTime:totalGoalTime
    };
    const storedGoal = await goalDataAccess.storeGoal(data);
    return {
      error: false,
      sucess: true,
      message: "user goal-set successfully",
      data: storedGoal,
    };
  };
    return {
      error: false,
      sucess: true,
      message: "updated user set goal successfully",
      data: update,
    }};

  exports.getGoal = async (req) => {
    const userId =req.token_data._id
    const goal = await goalDataAccess.findGoal({userId:userId});
    return {
      error: false,
      sucess: true,
      message: "Get user data",
      data: goal,
    };
  };


  exports.streak = async (req) => {
    const { setting} = req.body;
    if (!setting) {
      throw new ExpressError(401, "Bad request");
    }
    const _id =req.token_data._id;
    const updateData = {
      _id,
      toUpdate: {
        setting:req.body.setting
      },
    };
    const update = await goalDataAccess.streakSet(updateData);
    console.log("update",update);
    if(!update){
      const data = {
        setting:req.body.setting,
        userId:_id
    };
    const streakData = await goalDataAccess.storeGoal(data);
    return {
      error: false,
      sucess: true,
      message: "add successfully streak data",
      data: streakData,
    };
  };
    return {
      error: false,
      sucess: true,
      message: "updated streak data successfully",
      data: update,
    }};
