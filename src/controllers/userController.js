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

    return res.status(200).json({ 'data': userModified })

  }),
  getAll: asyncHandler(async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users);
  }),
  getById: asyncHandler(async (req, res) => {
    try {
      const { _id } = req.query;
      const user = await User.findOne({ _id })
      if (user) {
        return res.status(200).json({ user })
      } else {
        return res.status(404).json({ 'mess': 'not found user' })
      }
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = userController;