const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  sender: { type: String, require: true, ref: "User" },
  between: { type: [String] },
  room_chat: { type: String, ref: "RoomChat" },
  last_messages: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Message" },
  nick_name: { type: String },
  seen_last_messages: { type: Boolean, require: true, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", ConversationSchema);