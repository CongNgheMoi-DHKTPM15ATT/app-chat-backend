const { Schema, model } = require('mongoose');

const RoomChatSchema = new Schema({
  _id: { type: String },
  name: { type: String, },
  avatar: { type: String },
}, { timestamps: true })

module.exports = model("RoomChat", RoomChatSchema);