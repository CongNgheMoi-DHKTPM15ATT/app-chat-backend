const { Schema, model } = require('mongoose');

const RoomChatSchema = new Schema({
  _id: { type: String },
  name: { type: String, },
  avatar: { type: String },
  list_user_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  last_message: { type: { content: String, time: Date, isSeen: Boolean } }
}, { timestamps: true })

module.exports = model("RoomChat", RoomChatSchema);