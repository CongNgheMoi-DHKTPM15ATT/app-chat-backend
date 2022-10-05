const { Schema, model } = require('mongoose');

const MessagesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  content: { type: String, require: true },
  content_type: { type: String, require: true, },
  user_id: { type: String, ref: 'User' },
  deleted: { type: Boolean },
  room_chat_id: [{ type: String, ref: "RoomChat" }]

}, { timestamps: true })

module.exports = model("Messages", MessagesSchema);