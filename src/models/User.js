const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, require: true, unique: true },
  password: { type: String, require: true, },
  avatar: { type: String },
  birth_day: { type: Date },
  list_friends: { type: [{ user_id: String, pending: Boolean }], default: [] },
  list_user_id_advice: [{ type: String, }],
  list_user_id_blocks: [{ type: String, }]


}, { timestamps: true })

module.exports = model("User", UserSchema);