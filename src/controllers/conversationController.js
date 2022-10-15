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

      const conversations = await Conversation.find({ 'members.user_id': user_id }, {}).populate({
        path: "last_message"
      }).sort({ 'updatedAt': 'desc' })

      for (i in conversations) {
        if (!conversations[i].is_room) {
          if (conversations[i].members.length === 2) {
            console.log(conversations[i]._id);
            let user_temp_id =
              conversations[i].members[0].user_id == user_id ?
              conversations[i].members[1].user_id : conversations[i].members[0].user_id
            conversations[i].set('receiver', await User.findById({ _id: user_temp_id }));
          } else if (conversations[i].members.length === 1) {} {
            console.log("private chat");
            console.log(conversations[i].is_room)
            await conversations.pop({ _id: conversations[i]._id })
          }
        } else {
          console.log("group chat");
          console.log(conversations[i].is_room)
          await conversations.pop(conversations[i])
        }
      }
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