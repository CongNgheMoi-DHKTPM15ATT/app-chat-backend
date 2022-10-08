const { Schema, model } = require('mongoose');

const RoomChatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, },
  avatar: { type: String },
  list_user_ids: [{ type: String }],
  socket_id: { type: String, require: true },
  lastMessage: { type: { content: String, time: Date, isSeen: Boolean } }
}, { timestamps: true })

module.exports = model("RoomChat", RoomChatSchema);