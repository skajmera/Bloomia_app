const Report=require('./report.model')
require('../utils/jwt')

const storeUser = async (userToStore) => {
    const storedUser = await Report.create(userToStore);
    return storedUser;
  };

  const findUser = async (data) => {
    const user = await Report.findById(data);
    return user;
  }
  module.exports={storeUser,findUser};
