const asyncHandler = require('express-async-handler');
const Message = require('./../models/Message.js');
const Conversation = require('./../models/Conversation.js');
const User = require('./../models/User.js');
const { ObjectId } = require('mongoose')

const messageController = {
  getMessageByConversation: asyncHandler(async (req, res, next) => {
    const { conversation_id } = req.body;
    const messages = await Message.find({ conversation: conversation_id }).populate({
      path: 'conversation'
    }).populate('sender')

    // messages.forEach((message) => {
    //   console.log(message.conversation.members)
    //   message.conversation.members.forEach((member) => {
    //     console.log("vao vong lap")
    //     if (member.user_id === message.sender._id) {
    //       console.log(member.user_id === message.sender._id)
    //       console.log(member.nick_name)
    //       messages.set('nick_name', member.nick_name)
    //     }
    //   })
    // })


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