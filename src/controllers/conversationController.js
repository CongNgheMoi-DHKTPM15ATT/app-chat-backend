const asyncHandler = require('express-async-handler');
const Conversation = require('./../models/Conversation.js');
const Messages = require('./../models/Messages.js');
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
      const { user_id } = req.query;

      const conversations = await Conversation.find({ between: user_id })
      // console.log(conversations.last_messages_id);
      // const last_messagse = await Messages.findOne({ _id: conversations.last_messages_id })
      // for (i in conversations) {
      //   console.log(conversations[i]);
      // }
      // conversations.last_messages = last_messagse;
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