const asyncHandler = require("express-async-handler");
const Conversation = require("./../models/Conversation.js");
const ConversationResponse = require("./../responses/conversationResponse.js")
const Message = require("./../models/Message.js");
const User = require("./../models/User.js");
const GroupChat = require("./../models/GroupChat.js")
const { generateAvatar } = require('./../utils/generateAvatar');
const { generateRoomName } = require('./../utils/groupChatService');
const mongoose = require('mongoose');


async function getUsers(user_ids) {
  const users = [];
  for (i in user_ids) {
    let user = await User.findOne({ _id: user_ids[i] });
    users.push(user);
  }
  return users;
}



const conversationController = {
  getAllByUser: asyncHandler(async (req, res, next) => {
    try {
      const { user_id } = req.body;
      const conversations_document = await Conversation.aggregate([
        { $match: { "members.user_id": mongoose.Types.ObjectId(user_id) } },
        {
          $project: {
            members: {
              $filter: {
                input: "$members",
                as: "member",
                cond: { $ne: ["$$member.user_id", mongoose.Types.ObjectId(user_id)] },
              },
            },
            receiver: 1,
            is_group: 1,
            last_message: 1,
            seen_last_message: 1,
            createdAt: 1,
            updatedAt: 1
          },
        },
        { $sort: { updatedAt: -1 } }
      ])
      const conversations_document_populate = await Conversation.populate(conversations_document, [
        { path: "last_message" },
        { path: "members.user_id" },
        { path: "receiver" }
      ])

      const conversations = [];
      let receiver;
      conversations_document_populate.forEach(async (conversation) => {
        if (!conversation.is_group) {
          if (conversation.members.length === 1) { //user to user

            if (!(conversation.last_message === undefined)) {
              conversations.push({
                ...new ConversationResponse(conversation).custom(),
                receiver: {
                  _id: conversation.members[0].user_id._id,
                  nick_name: conversation.members[0].nick_name || conversation.members[0].user_id.user_name,
                  avatar: conversation.members[0].user_id.avatar || generateAvatar(conversation.members[0].user_id.user_name, "white", "#009578"),
                },
              });
            }
          } else if (conversation.members.length === 0) { //private chat
            // conversations_document.splice(i, 1);
            // i--;
          }
        } else { //group chat

          const members = [];
          for (var i = 0; i < conversation.members.length; i++) {

            members.push({
              _id: conversation.members[i].user_id._id,
              nick_name: conversation.members[i].nick_name || conversation.members[i].user_id.user_name,
              avatar: conversation.members[i].user_id.avatar || generateAvatar(conversation.members[i].user_id.user_name, "white", "#009578"),
            })
          }

          if (!conversation.hasOwnProperty('last_message')) {
            const message = await new Message({
              sender: members[0]._id,
              content: "xin chào",
              content_type: "text",
              conversation: conversation._id,
            }).save();

            conversation.last_message = message._id;
            const conversations_document = await Conversation.findByIdAndUpdate(conversation._id, { $set: { "last_message": message._id } });
            conversation.last_message = message;
          }

          const nameGroupChat = generateRoomName(members);

          conversations.push({
            ...new ConversationResponse(conversation).custom(),
            receiver: {
              _id: conversation.receiver._id,
              nick_name: conversation.receiver.nick_name || nameGroupChat,
              avatar: conversation.receiver.avatar,
              members
            },
          });
        }
      });

      return res.status(200).json({ conversations });
    } catch (err) {
      console.log(err);
    }
  }),
  create: asyncHandler(async (req, res, next) => {
    const { user_id } = req.body;

    const users = await getUsers(user_id);

    const members = [];
    users.forEach((user) => {
      members.push({ user_id: user._id, nick_name: user.user_name });
    });

    conversation = await new Conversation({
      members: members,
      is_group: members.length === 2 ? false : true,
      receiver: groupChat || undefined,
    }).save();

    res.status(200).json(conversation);
  }),
  getConversationIsGroup: asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    conversations_document = await Conversation.find({ "members.user_id": mongoose.Types.ObjectId(user_id), is_group: "true" });

    console.log(conversations_document);

    return res.json({ conversations_document })
  }),
  createGroup: asyncHandler(async (req, res) => {
    const { user_id, group_name } = req.body;

    const users = await getUsers(user_id);

    const members = [];

    users.forEach((user) => {
      if (members.length === 0 || members.filter(function(e) { return e.user_id == user_id; }).length == 0) {
        members.push({ user_id: user._id, nick_name: user.user_name });
      }
    });
    let groupChat = null;
    if (members.length > 2) {
      const nameGroupChat = generateRoomName(members);
      groupChat = await GroupChat.create({
        nick_name: group_name || nameGroupChat,
        avatar: generateAvatar("Group", "white", "#FFCC66")
      })
    } else {
      res.status(400).json({ "msg": "group must have 3 members" });
    }

    const message = await new Message({
      sender: members[0].user_id,
      content: "xin chào",
      content_type: "text",
    }).save();

    conversation = await new Conversation({
      members: members,
      is_group: members.length === 2 ? false : true,
      receiver: groupChat || undefined,
      last_message: message._id
    }).save();

    console.log(conversation._id)

    message.conversation = conversation._id;
    message.save();
    console.log(message);
    console.log(conversation);

    res.status(200).json(conversation);
  })
};

module.exports = conversationController;