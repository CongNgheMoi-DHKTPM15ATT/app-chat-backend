const asyncHandler = require('express-async-handler');
const Conversation = require('./../models/Conversation.js');
const Messages = require('./../models/Messages.js');

const conversationController = {
  getAllByUser: asyncHandler(async (req, res, next) => {
    try {
      const { user_id } = req.query;

      const conversations = await Conversation.find({ between: user_id })
      console.log(conversations.last_messages_id);
      const last_messagse = await Messages.findOne({ _id: conversations.last_messages_id })
      for (i in conversations) {
        console.log(conversations[i]);
      }
      conversations.last_messages = last_messagse;
      return res.status(200).json({ conversations });
    } catch (err) {
      console.log(err)
    }

  }),
}

module.exports = conversationController;