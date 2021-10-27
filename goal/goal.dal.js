const Goal = require("./goal.model");
require("../utils/jwt");

const storeUser = async (userToStore) => {
  const storedUser = await Goal.create(userToStore);
  return storedUser;
};

const findUser = async (data) => {
  const user = await Goal.find(data);
  return user;
};

const updateUser = async (userData) => {
  const user = await Goal.findOneAndUpdate(
    userData._id,
    { $set: userData.toUpdate },
    { new: true }
  );
  return user;
};


module.exports = { storeUser, findUser,updateUser };
