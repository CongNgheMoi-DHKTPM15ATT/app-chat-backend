const { Schema, model } = require('mongoose');
const express = require('express');

const MessagesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  content: { type: String, require: true },
  content_type: { type: String, require: true, default: 'text' },
  sender: { type: String, ref: 'User', require: true },
  deleted: { type: Boolean },
  conversation_id: [{ type: String, require: true, ref: "Conversation" }]
}, { timestamps: true })

module.exports = model("Messages", MessagesSchema);