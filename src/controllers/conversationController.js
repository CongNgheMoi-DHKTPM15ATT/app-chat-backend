const asyncHandler = require("express-async-handler");
const Conversation = require("./../models/Conversation.js");
const ConversationResponse = require("./../responses/conversationResponse.js")
const Message = require("./../models/Message.js");
const User = require("./../models/User.js");
const GroupChat = require("./../models/GroupChat.js")
const { generateAvatar } = require('./../utils/generateAvatar');

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
      console.log("user id: " + user_id);


      const conversations_document = await Conversation.find({ "members.user_id": user_id }, {})
        .populate({
          path: "last_message",
        })
        .populate({ path: "members.user_id" })
        .sort({ updatedAt: "desc" });

      const conversations = [];
      let receiver;

      conversations_document.forEach(async (conversation) => {
        if (!conversation.is_room) {
          if (conversation.members.length === 2) {
            console.log(
              "user chat: " +

              conversation.members.length +
              " " +
              conversation._id
            );
            let receiver_document =
              conversation.members[0].user_id._id == user_id ?
              conversation.members[1] :
              conversation.members[0];
            let user_document =
              conversation.members[0].user_id._id == user_id ?
              conversation.members[0].nick_name :
              conversation.members[1].nick_name;

            // var user = await User.findById({ _id: receiver_document._id })
            // receiver = {
            //   ...receiver_document,
            //   // "avatar": user.avatar
            // }
            // conversation.set('receiver', await User.findById({ _id: user_temp_id }));
            // receiver.set('avatar', user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')

            if (!(conversation.last_message === undefined)) {
              conversations.push({
                ...new ConversationResponse(conversation).custom(),
                receiver: {
                  _id: receiver_document.user_id._id,
                  nick_name: receiver_document.nick_name,
                  avatar: receiver_document.user_id.avatar || generateAvatar(receiver_document.user_id.user_name, "white", "#009578"),
                },

              });
            }
          } else if (conversation.members.length === 1) {
            console.log(
              "private chat: " +

              conversation.members.length +
              " " +
              conversation._id
            );
            // conversations_document.splice(i, 1);
            // i--;
          }
        } else {
          console.log(
            "group chat: " +

            conversation.members.length +
            " " +
            conversation._id

          );
          // conversations_document.splice(i, 1);
          // i--;
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
    let groupChat = null;
    if (members.length > 2) {
      const nameGroupChat = `${members[0].nick_name}, ${members[1].nick_name}, ${members[2].nick_name}`
      groupChat = await GroupChat.create({
        name: members.length > 3 ? `${nameGroupChat},...` : nameGroupChat,
        avatar: generateAvatar("Group", "white", "#FFCC66")
      })
      console.log(groupChat)
    }

    console.log(groupChat._id)

    conversation = await new Conversation({
      members: members,
      is_group: members.length === 2 ? false : true,
      receiver: groupChat._id || undefined,
    }).save();

    res.status(200).json(conversation);
  }),
};

module.exports = conversationController;