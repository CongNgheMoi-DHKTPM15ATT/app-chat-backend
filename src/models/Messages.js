const { Schema, model } = require('mongoose');

const MessagesSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, require: true },
  content_type: { type: String, require: true, },
  user_id: { type: String, ref: 'User' },
  deleted: { type: Boolean },

}, { timestamps: true })

module.exports = model("Messages", MessagesSchema);