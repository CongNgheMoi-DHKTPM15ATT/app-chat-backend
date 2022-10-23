const { Schema, model } = require("mongoose");
const express = require("express");

const MessageSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    sender: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    content: { type: String, require: true },
    content_type: { type: String, require: true },
    deleted: { type: Boolean, default: false },
    conversation: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Conversation",
    },
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);
