const { Schema, model } = require('mongoose');

const GroupChatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  nick_name: { type: String, },
  avatar: { type: String },
}, { timestamps: true })

module.exports = model("GroupChat", GroupChatSchema);