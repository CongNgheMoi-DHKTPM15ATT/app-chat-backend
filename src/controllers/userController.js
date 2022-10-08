const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');

const userController = {
  addFriend: asyncHandler(async (req, res) => {
    const { user_id, friend_id } = req.body;

    console.log(friend_id);

    const user = await User.findOne({ '_id': user_id })

    console.log(user)

    user.list_friends = [{ 'user_id': friend_id, 'pending': false }]

    userModified = user.save();


    socket.id

    return res.status(200).json({ 'data': userModified })

  }),
  getAll: asyncHandler(async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users);
  })
}

module.exports = userController;