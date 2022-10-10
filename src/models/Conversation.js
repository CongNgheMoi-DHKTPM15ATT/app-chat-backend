const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  sender: { type: String, require: true, ref: "User" },
  between: { type: [{ user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, nick_name: String }] },
  room_chat: { type: String, ref: "RoomChat" },
  last_messages: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Message" },
  seen_last_messages: { type: Boolean, require: true, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", ConversationSchema);