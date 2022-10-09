const asyncHandler = require('express-async-handler');
const Conversation = require('./../models/Conversation.js');

const conversationController = {
  getAllByUser: asyncHandler(async (req, res, next) => {
    try {
      const { user_id } = req.body;
      const conversations = Conversation.find({ user_id })
      return res.status(1).json(data: conversations);
    } catch (err) {
      console.log(err)
    }

  }),
}

module.exports = conversationController;