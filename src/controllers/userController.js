const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');
const UserResponse = require('./../responses/userResponse');

const userController = {
  searchUser: asyncHandler(async (req, res) => {
    const { user_id, filter } = req.body;
    const phoneValid = /^0+\d{9}$/;

    if (filter.match(phoneValid)) {
      const user_document = await User.findOne({ phone: filter });
      console.log(user_document)
      if (user_document) {
        return res.json(new UserResponse(user_document).custom())
      } else {
        return res.send("phone is not exist")
      }

    } else {
      const user_document = await User.find({ user_name: { $regex: '.*' + filter + '.*' } });
      if (user_document) {
        return res.json(user_document)
      } else {
        return res.send("phone is not exist")
      }
    }
  }),
  addFriend: asyncHandler(async (req, res) => {
    const { user_id, friend_id } = req.body;
    console.log(friend_id);
    const user = await User.findById({ '_id': user_id })

    user.list_friends = [...user.list_friends, { 'friends.user_id': friend_id, 'status': 'pending' }]
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
      const user = await User.findById({ _id })
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