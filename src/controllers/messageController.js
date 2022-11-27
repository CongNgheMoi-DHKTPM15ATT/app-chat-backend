const asyncHandler = require("express-async-handler");
const Message = require("./../models/Message.js");
const MessageResponse = require("./../responses/messageResponse");
const Conversation = require("./../models/Conversation.js");
const User = require("./../models/User.js");
const { ObjectId } = require("mongoose");
const { generateAvatar } = require("./../utils/generateAvatar");

const messageController = {
  getAllByContentType: asyncHandler(async (req, res) => {
    const { conversation_id, content_type } = req.body;
    const messages_document = await Message.find({
      conversation: conversation_id,
      content_type: content_type,
    });
    console.log(messages_document);
    return res.json(messages_document);

  }),
  getAllByContentTypeTop4: asyncHandler(async (req, res) => {
    const { conversation_id, content_type } = req.body;
    const messages_document = await Message.find({
      conversation: conversation_id,
      content_type: content_type,
    })
      .limit(4)
      .sort({ createdAt: -1 });
    console.log(messages_document);
    return res.json(messages_document);
  }),
  deleteByConversation: asyncHandler(async (req, res) => {}),
  getMessageByConversation: asyncHandler(async (req, res, next) => {
    const { conversation_id, limit, offset } = req.body;
    try {
      const messages_document = await Message.find({
        conversation: conversation_id,
      })
        .populate({
          path: "conversation",
        })
        .populate("sender")
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      const messages = [];
      let sender;
      console.log(messages_document);
      messages_document.forEach((message) => {
        message.conversation.members.forEach((member) => {
          if (member.user_id.toString() === message.sender._id.toString()) {
            sender = {
              user_id: member.user_id,
              nick_name: member.nick_name,
              joinedDate: member.joinedDate || message.conversation.createdAt,
              avatar:
                message.sender.avatar ||
                generateAvatar(message.sender.user_name, "white", "#009578"),
            };
            return;
          }
        });
        try {
          if (
            sender.joinedDate <= message.createdAt ||
            messages_document[messages_document.length - 1].content_type ==
              "notification"
          ) {
            messages.push({
              ...new MessageResponse(message).custom(),
              sender: sender,
            });
          }
        } catch (err) {
          console.log(err);
        }
      });

      return res.json({
        messages,
      });
    } catch (err) {
      console.log(err);
    }

  }),
  // getLastMessage: asyncHandler(async (req, res, next) => {
  //   const { senderId, receiverId } = req.query;
  //   const mess = await Message.findOne({ 'users': { '$in': [senderId, receiverId] } }, {}, { sort: { 'createdAt': -1 } });
  //   return res.json({ 'data': mess })
  // }),
  save: asyncHandler(async (req, res, next) => {
    try {
      console.log("start save msg");
      const { sender_id, conversation_id, text, content_type } = req.body;

      const message = await new Message({
        sender: sender_id,
        content: text,
        content_type: content_type,
        conversation: conversation_id,
      }).save();

      console.log(message);

      const conversation = await Conversation.findByIdAndUpdate(
        { _id: conversation_id },
        {
          last_message: message._id,
        }
      );

      if (message)
        return res
          .status(200)
          .json({ message: "Message added successfully.", data: message });
      else
        return res
          .status(400)
          .json({ message: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  }),
  recovery: asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const doc = await Message.findOneAndUpdate(
      { _id },
      {
        deleted: true,
        content: "Tin nhắn đã được thu hồi",
        content_type: "recover",
      },
      { returnOriginal: false }
    );
    console.log(doc);

    if (doc) {
      return res.json({
        success: true,
        msg: "Recover message successfully",
        data: doc,
      });
    } else {
      return res.json({ success: false, msg: "Recover message Failed" });
    }
  }),
};

module.exports = messageController;
