const User=require('./user.model')
require('../utils/jwt')

const findUsers = async (req) => {
  const users = await User.findById(req.token_data._id);
  return users;
}

const storeUser = async (userToStore) => {
  const user = new User({ ...userToStore });
  const storedUser = await user.save();
  return storedUser;
};

const findUserByUsername=async(username)=>{
  const user= await User.findOne(username);
  return user
}

const updateUser=async(userData)=>{
  const user=await User.findByIdAndUpdate(userData._id, { $set : userData.toUpdate}, { new: true })
  return user
}

const updatePassword=async(userData)=>{
  const data=await User.findByIdAndUpdate(userData._id,{$set:userData.toUpdate},{new:true})
  return data
}

const updateProfile=async(userImage)=>{
  const data=await User.findByIdAndUpdate(userImage._id,{$set:userImage.toUpdate},{new:true})
  return data
}

const forgotPass=async(resetPassword)=>{
  const data=await User.findOne(resetPassword);
  return data
}

module.exports={findUsers,storeUser,findUserByUsername,updateUser,updatePassword,updateProfile,forgotPass}




