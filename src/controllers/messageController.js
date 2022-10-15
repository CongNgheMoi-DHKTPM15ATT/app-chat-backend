const asyncHandler = require('express-async-handler');
const Message = require('./../models/Message.js');
const Conversation = require('./../models/Conversation.js');
const User = require('./../models/User.js');
const { ObjectId } = require('mongoose')

const messageController = {
  getMessageByConversation: asyncHandler(async (req, res, next) => {
    const { conversation_id } = req.body;
    const messages = await Message.find({}).populate('conversation').populate('sender')

    for (i in messages) {
      // console.log(messages[i].conversation.members)
      let sender_id = messages[i].sender._id
      console.log("sender: " + sender_id)
      messages[i].conversation.members.forEach((e) => {
        let user_id = e.user_id
        console.log(user_id)
        if (user_id === sender_id) {
          messages.set('nick_name', e.nick_name)
          return;
        }
      })
    }

    return res.json({ messages })
  }),
  // getLastMessage: asyncHandler(async (req, res, next) => {
  //   const { senderId, receiverId } = req.query;
  //   const mess = await Message.findOne({ 'users': { '$in': [senderId, receiverId] } }, {}, { sort: { 'createdAt': -1 } });
  //   return res.json({ 'data': mess })
  // }),
  save: asyncHandler(async (req, res, next) => {
    try {
      console.log('start save msg')
      const { sender_id, conversation_id, text } = req.body;

      const message = await new Message({
        sender: sender_id,
        content: text,
        conversation: conversation_id,
      }).save();

      console.log(conversation_id)

      const conversation = await Conversation.findByIdAndUpdate({ _id: conversation_id }, {
        last_message: message._id,
      });

      if (message) return res.status(200).json({ msg: 'Message added successfully.', 'data': message });
      else return res.status(400).json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }

  }),
}

module.exports = messageController;