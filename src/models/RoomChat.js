const { Schema, model } = require('mongoose');

const RoomChatSchema = new Schema({
  _id: { type: String },
  name: { type: String, },
  avatar: { type: String },
  list_user_ids: [{ type: String, ref: "User" }],
  lastMessage: { type: { content: String, time: Date, isSeen: Boolean } }
}, { timestamps: true })

module.exports = model("RoomChat", RoomChatSchema);