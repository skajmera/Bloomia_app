const Report = require("./report.model");
require("../utils/jwt");

const storeTime = async (userToStore) => {
  const storedUser = await Report.create(userToStore);
  return storedUser;
};

const findUser = async (data) => {
  const user = await Report.find(data);
  return user;
};

const updateTime = async (userData) => {
  const user = await Report.findOneAndUpdate(
    { creatTime: userData.creatTime },
    userData.toUpdate,
    { new: true }
  );
  return user;
};

const findAll = async () => {
  const user = await Report.find({});
  return user;
};

module.exports = { findUser,storeTime,updateTime,findAll};
