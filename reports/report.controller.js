const usersDataAccess = require("./report.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.createUser = async (req) => {
  const { setTime, setCount } = req.body;
  if ((!setTime, !setCount)) {
    throw new ExpressError(401, "Bad request");
  }
  const _id = req.token_data._id;
  const data = {
    setCount: setCount,
    setTime: setTime,
    userId: _id,
  };
  const storedUser = await usersDataAccess.storeUser(data);
  return {
    error: false,
    sucess: true,
    message: "user report-set successfully",
    data: storedUser,
  };
};

exports.getUser = async (req) => {
  const reportId = req.body.reportId;
  const users = await usersDataAccess.findUser({ _id: reportId });
  return {
    error: false,
    sucess: true,
    message: "Get report data",
    data: users,
  };
};
