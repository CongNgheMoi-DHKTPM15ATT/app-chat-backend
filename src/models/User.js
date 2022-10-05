const { Schema, model } = require('mongoose');

const Friends = new Schema({
  user_id: { type: String, ref: 'User' },
  pending: Boolean
}, { _id: false, autoIndex: false })

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  userName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, unique: true },
  avatar: { type: String },
  birth_day: { type: Date, default: Date.now },
  list_friends: { type: [Friends], default: [] },
  list_user_id_advice: { type: [{ type: String, }], default: [] },
  list_user_id_blocks: { type: [{ type: String, }], default: [] }


}, { timestamps: true })

module.exports = model("User", UserSchema);