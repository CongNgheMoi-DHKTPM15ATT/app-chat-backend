const asyncHandler = require('express-async-handler');
const Messages = require('./../models/Messages.js');

const messageController = {
  // getMessage: asyncHandler(async (req, res, next) => {
  //   try {
  //     const { from, to } = req.body;

  //     const messages = await Messages.find({
  //       users: {
  //         $all: [from, to],
  //       },
  //     }).sort({ updatedAt: 1 });

  //     const projectedMessages = messages.map((msg) => {
  //       return {
  //         fromSelf: msg.sender.toString() === from,
  //         message: msg.message.text,
  //       };
  //     });
  //     res.json(projectedMessages);
  //   } catch (ex) {
  //     next(ex);
  //   }
  // }),
  getLastMessages: asyncHandler(async (req, res, next) => {
    const { senderId, receiverId } = req.query;
    const mess = await Messages.findOne({ 'users': { '$in': [senderId, receiverId] } }, {}, { sort: { 'createdAt': -1 } });
    return res.json({ 'data': mess })
  }),
  save: asyncHandler(async (req, res, next) => {
    try {
      console.log('start save msg')
      const { senderId, receiverId, text } = req.body;

      const data = await new Messages({
        content: text,
        sender: senderId,
        users: [senderId, receiverId],
      }).save();

      if (data) return res.status(200).json({ msg: 'Message added successfully.', 'data': data });
      else return res.status(400).json({ msg: 'Failed to add message to the database' });
    } catch (ex) {
      next(ex);
    }

  }),
}

module.exports = messageController;