const User = require('./../models/User')
const mongoose = require('mongoose');

exports.getMems = async (user_ids) => {
  const users = [];
  try {
    for (i in user_ids) {
      console.log(user_ids[i])
      let user = await User.findById(user_ids[i]);
      users.push({
        user_id: user._id,
        nick_name: user.user_name
      });
    }
    return users;
  } catch (err) {
    return null;
  }
}