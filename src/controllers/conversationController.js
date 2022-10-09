const asyncHandler = require('express-async-handler');
const Conversation = require('./../models/Conversation.js');

const conversationController = {
  getAllByUser: asyncHandler(async (req, res, next) => {
    try {
      const { user_id } = req.query;
      console.log(user_id)
      const conversations = await Conversation.find({ between: user_id })
      return res.status(200).json({ conversations });
    } catch (err) {
      console.log(err)
    }

  }),
}

module.exports = conversationController;