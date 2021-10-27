const usersDataAccess = require("./goal.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.updateUser = async (req) => {
    const { set,setType} = req.body;
    if (!set || !setType) {
      throw new ExpressError(401, "Bad request");
    }
    const _id = req.token_data._id;
    const updateData = {
      _id,
      toUpdate: {
        set:set,
        setType:setType
      },
    };
    const update = await usersDataAccess.updateUser(updateData);
    if(!update){
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
    return {
      error: false,
      sucess: true,
      message: "updated user set goal successfully",
      data: update,
    }};

  exports.getUser = async (req) => {
    const userId = req.token_data._id
    console.log(userId);
    const users = await usersDataAccess.findUser({ userId: userId });
    return {
      error: false,
      sucess: true,
      message: "Get user data",
      data: users,
    };
  };
  
  