const User = require('./../models/User')

exports.getMems = async (user_ids) => {
  const users = [];
  for (i in user_ids) {
    let user = await User.findOne({ _id: user_ids[i] });
    users.push({
      user_id: user._id,
      nick_name: user.user_name
    });
  }
  return users;
}