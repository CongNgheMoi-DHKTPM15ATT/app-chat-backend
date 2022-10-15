const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  members: {
    type: [{
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      nick_name: { type: String },
      _id: false
    }]
  },
  receiver: { type: mongoose.Schema.Types.ObjectId },
  is_room: { type: Boolean, default: false },
  last_message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  seen_last_messages: { type: Boolean, require: true, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", ConversationSchema);