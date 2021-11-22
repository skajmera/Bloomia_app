const Invite = require("./admin.model");

const findEmail = async (sendData) => {
  const invite = await Invite.findOne(sendData);
  return invite;
};


const storeAdmin = async (emailToStore) => {
  const storedata = await Invite.create(emailToStore);
  return storedata;
};

const findById = async (sendData) => {
  const invite = await Invite.findById(sendData);
  return invite;
};         

const deAll=async()=>{
  const user=await Invite.remove({})
  console.log(user)
}
// deAll()
module.exports = {findEmail,storeAdmin,findById};