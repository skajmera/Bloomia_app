const goalDataAccess = require("./goal.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.updateGoal = async (req) => {
    const { set,setType} = req.body;
    if (!set || !setType) {
      throw new ExpressError(401, "Bad request");
    }
    const _id =req.token_data._id;
    const updateData = {
      _id,
      toUpdate: {
        set:set,
        setType:setType
      },
    };
    const update = await goalDataAccess.updateGoal(updateData);
    if(!update){
      const data = {
        set:set,
        setType:setType,
        userId:_id
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