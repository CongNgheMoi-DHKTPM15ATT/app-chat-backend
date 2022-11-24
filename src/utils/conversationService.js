const User = require("./../models/User");
const mongoose = require("mongoose");

exports.getMems = async (user_ids) => {
  const users = [];
  try {
    if (user_ids)
      for (var i = 0; i < user_ids.length; i++) {
        console.log(i);
        console.log(user_ids[i]);
        let user = await User.findById(user_ids[i]);
        users.push({
          user_id: user._id,
          nick_name: user.user_name,
          joinedDate: await Date.now(),
        });
      }
    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
};
