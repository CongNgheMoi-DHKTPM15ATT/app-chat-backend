const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, require: true, ref: "User" },
  receiver_id: { type: String, require: true },
  chat_type: { type: String, require: true },
  last_messages_id: { type: String, require: true },
  nick_name: { type: String },
  seen_last_messages: { type: Boolean, require: true }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", ConversationSchema);