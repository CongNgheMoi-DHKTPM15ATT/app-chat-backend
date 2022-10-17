const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');
const UserResponse = require('./../responses/userResponse');
const mongoose = require('mongoose')

const friendStatus = {
  friended: 'friended',
  pending: 'pending',
  accepting: 'accepting',
}

async function addFriend(user_id, receiver_id, status) {
  const user = await User.findById({ '_id': user_id })
  user.friends.push({ 'user_id': receiver_id, 'status': status });
  user.save();
  console.log(user)
  return user;
}

async function updateFriend(user_id, receiver_id, status) {
  const user = await User.update({ '_id': mongoose.Types.ObjectId(user_id), 'friends.user_id': receiver_id }, { '$set': { 'friends.$.status': status } });
  console.log(user)
  return user;
}

async function removeFriend(user_id, receiver_id) {
  const user = await User.update({ '_id': mongoose.Types.ObjectId(user_id), 'friends.user_id': receiver_id }, { '$set': { 'friends.$.status': undefined, 'friends.$.user_id': undefined } });
  console.log(user)
  return user;
}

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
  sendFriendRequest: asyncHandler(async (req, res) => {
    const { user_id, receiver_id } = req.body;

    const user_document = await User.findOne({
      '_id': mongoose.Types.ObjectId(user_id),
      'friends.user_id': receiver_id
    })
    console.log(user_document)

    if (user_document === null) {

      const user = await addFriend(user_id, receiver_id, friendStatus.pending)
      await addFriend(receiver_id, user_id, friendStatus.accepting)

      return res.status(200).json({ 'user': new UserResponse(user).custom() })
    } else {
      return res.send("already send requset friend");
    }
  }),
  confirmFriendRequest: asyncHandler(async (req, res) => {
    const { user_id, receiver_id, is_accept } = req.body;

    const user_document = await User.findOne({
      '_id': mongoose.Types.ObjectId(user_id),
      'friends.user_id': receiver_id
    })

    if (is_accept === true) {

      const user = await updateFriend(user_id, receiver_id, friendStatus.friended)
      await updateFriend(receiver_id, user_id, friendStatus.friended)

      return res.status(200).json({ 'user': new UserResponse(user).custom() })
    } else {
      await removeFriend(user_id, receiver_id)
      await removeFriend(receiver_id, user_id)
      return res.send("already send requset friend");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users);
  }),
  getById: asyncHandler(async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      const user_document = await User.findById({ _id })
      if (user_document) {
        return res.status(200).json(new UserResponse(user_document).custom())
      } else {
        return res.status(404).json({ 'mess': 'not found user' })
      }
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = userController;