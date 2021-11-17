const Invite = require("./admin.model");

const findEmail = async (sendData) => {
    const invite = await Invite.findOne(sendData);
    return invite
  };

  const storeAdmin = async (emailToStore) => {
    const storedata = await Invite.create(emailToStore);
    return storedata;
  };
  
  module.exports = {findEmail,storeAdmin};
  