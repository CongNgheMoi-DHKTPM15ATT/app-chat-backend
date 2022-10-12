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
      const { sender_id, conversation_id, text } = req.body;

      const message = await new Messages({
        sender: sender_id,
        content: text,
        conversation: conversation_id,
      }).save();

      const conversation = await Conversation.findOneAndUpdate({ conversation_id }, {
        last_messages: message._id,
      });

      console.log(conversation);

      if (message) return res.status(200).json({ msg: 'Message added successfully.', 'data': message });
      else return res.status(400).json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }

  }),
}

module.exports = messageController;