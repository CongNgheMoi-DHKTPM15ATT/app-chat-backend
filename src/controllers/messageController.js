const asyncHandler = require('express-async-handler');
const Messages = require('./../models/Messages.js');
const Conversation = require('./../models/Conversation.js');
const User = require('./../models/User.js');

const messageController = {
  getMessagesByConversation: asyncHandler(async (req, res, next) => {
    const { conversation_id } = req.query;
    console.log(conversation_id)
    const messages = await Messages.find({ "conversation_id": { "$in": [conversation_id] } })
    return res.json({ messages })
  }),
  // getLastMessages: asyncHandler(async (req, res, next) => {
  //   const { senderId, receiverId } = req.query;
  //   const mess = await Messages.findOne({ 'users': { '$in': [senderId, receiverId] } }, {}, { sort: { 'createdAt': -1 } });
  //   return res.json({ 'data': mess })
  // }),
  save: asyncHandler(async (req, res, next) => {
    try {
      console.log('start save msg')
      const { senderId, receiverId, text } = req.body;

      const message = await new Messages({
        sender: senderId,
        content: text,
      }).save();

      const userReceive = await User.find({ '_id': receiverId });

      let conversation = await Conversation.findOne({ between: { "$in": [senderId, receiverId] } })
      if (conversation) {
        conversation.last_messages = message._id;
        conversation.save()
      } else {
        console.log("test")
        conversation = await new Conversation({
          between: [senderId, receiverId],
          chat_type: 'user',
          last_messages: message._id,
          nick_name: userReceive.user_name,
        }).save();
      }

      console.log(conversation)

      message.conversation_id = conversation._id
      message.save();

      if (message) return res.status(200).json({ msg: 'Message added successfully.', 'data': message });
      else return res.status(400).json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }

  }),
}

module.exports = messageController;