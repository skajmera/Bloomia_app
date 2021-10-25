const usersDataAccess = require("./goal.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.createUser = async (req) => {
    const { set,setType} = req.body;
    if (!set || !setType) {
      throw new ExpressError(401, "Bad request");
    }
    const _id = req.token_data._id;
    const data = {
        set:set,
        setType:setType,
        userId:_id
    };
    const storedUser = await usersDataAccess.storeUser(data);
    return {
      error: false,
      sucess: true,
      message: "user goal-set successfully",
      data: storedUser,
    };
  };


  exports.getUser = async (req) => {
    const goalId = req.body.goalId;
    const users = await usersDataAccess.findUser({ _id: goalId });
    return {
      error: false,
      sucess: true,
      message: "Get user data",
      data: users,
    };
  };
  
  exports.updateUser = async (req, res) => {
    const { set,setType,goalId} = req.body;
    if (!set || !setType) {
      throw new ExpressError(401, "Bad request");
    }
    const _id = goalId
    const updateData = {
      _id,
      toUpdate: {
        set:set,
        setType:setType
      },
    };
    const update = await usersDataAccess.updateUser(updateData);
    return {
      error: false,
      sucess: true,
      message: "updated user set goal successfully",
      data: update,
    };
  };
  