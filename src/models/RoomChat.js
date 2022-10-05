const { Schema, model } = require('mongoose');

const RoomChatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, },
  avatar: { type: String },
  list_user_id: [{ type: String }]
}, { timestamps: true })

module.exports = model("RoomChat", RoomChatSchema);