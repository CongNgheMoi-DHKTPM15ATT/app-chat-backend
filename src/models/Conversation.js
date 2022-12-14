const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    members: {
      type: [
        {
          user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          nick_name: { type: String },
          joinedDate: { type: Date },
          is_removed: { type: Boolean, default: false },
          _id: false,
        },
      ],
    },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" },
    is_group: { type: Boolean, default: false },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    seen_last_messages: { type: Boolean, require: true, default: false },
    is_blocked: { type: Boolean },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    setting: {
      isFreeEnter: { type: Boolean },
      isFreeKickMem: { type: Boolean },
      isFreeEdit: { type: Boolean },
    },
    is_secret: { type: Boolean, default: false },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
