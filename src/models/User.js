const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    user_name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String },
    phone: { type: String, unique: true },
    avatar: { type: String },
    birth_day: { type: Date, default: Date.now },
    friends: {
      type: [
        {
          user_id: { type: Schema.Types.ObjectId, ref: "User" },
          status: String,
          _id: false,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
