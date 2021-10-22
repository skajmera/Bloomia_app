const usersDataAccess = require("./goal.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.createUser = async (req) => {
    const { timeSet} = req.body;
    if (!timeSet) {
      throw new ExpressError(401, "Bad request");
    }
    const _id = req.token_data._id;
    const data = {
        set:req.body.set,
        setType:req.body.setType,
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
  