const asyncHandler = require('express-async-handler');
const Conversation = require('./../models/Conversation.js');
const Message = require('./../models/Message.js');
const User = require('./../models/User.js')

async function getUsers(user_ids) {
  const users = [];
  for (i in user_ids) {
    let user = await User.findOne({ _id: user_ids[i] });
    console.log(user)
    users.push(user)
  }
  return users;
}

const conversationController = {
  getAllByUser: asyncHandler(async (req, res, next) => {
    try {
      const { user_id } = req.body;

      console.log(user_id);

      const conversations = await Conversation.find({ 'members.user_id': user_id }).populate({
        path: "last_message"
      })

      return res.status(200).json({ conversations });
    } catch (err) {
      console.log(err)
    }
  }),
  create: asyncHandler(async (req, res, next) => {
    const { user_id } = req.body;

    console.log(user_id)

    const users = await getUsers(user_id);

    console.log('data ' + users)

    const members = [];
    users.forEach((user) => {
      members.push({ user_id: user._id, nick_name: user.user_name })
    })

    conversation = await new Conversation({
      members: members,
      is_room: members.length === 2 ? false : true,
    }).save();

    res.status(200).json(conversation);
  }),
}

module.exports = conversationController;