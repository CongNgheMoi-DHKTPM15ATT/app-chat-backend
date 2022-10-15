const asyncHandler = require('express-async-handler');
const Message = require('./../models/Message.js');
const Conversation = require('./../models/Conversation.js');
const User = require('./../models/User.js');
const { ObjectId } = require('mongoose')

const messageController = {
  getMessageByConversation: asyncHandler(async (req, res, next) => {
    const { conversation_id } = req.body;
    const messages_document = await Message.find({ conversation: conversation_id }).populate({
      path: 'conversation'
    }).populate('sender')

    const messages = []
    let sender;

    messages_document.forEach((message) => {

      message.conversation.members.forEach((member) => {
        if (member.user_id.toString() === message.sender._id.toString()) {
          sender = {
            'user_id': member.user_id,
            'nick_name': member.nick_name
          }
          return;
        }
      })
      messages.push({
        "_id": message._id,
        "content": message.content,
        "content_type": message.content_type,
        "deleted": false,
        "sender": sender,
        "createdAt": message.createAt,
        "updatedAt": message.updateAt,
      })
    })


    return res.json({
      messages
    })
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

      if (message) return res.status(200).json({ message: 'Message added successfully.', 'data': message });
      else return res.status(400).json({ message: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }

  }),
}

module.exports = messageController;