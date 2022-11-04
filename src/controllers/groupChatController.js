const asyncHandler = require('express-async-handler');
const GroupChat = require('./../models/GroupChat.js');
const Conversation = require('./../models/Conversation.js');
const { getMems } = require('./../utils/conversationService');
const BaseRepository = require('./../repositories/BaseRepository');
const mongoose = require('mongoose');

const model = "GroupChat"

const baseRepository = new BaseRepository(model)

const groupRepository = {
  getAll: asyncHandler(async (req, res) => { await baseRepository.getAll(req, res) }),
  findById: asyncHandler(async (req, res) => { await baseRepository.findById(req, res) }),
  update: asyncHandler(async (req, res) => { await baseRepository.update(req, res) }),
}

const groupChatController = {
  ...groupRepository,
  addMems: asyncHandler(async (req, res) => {
    const { conversation_id, admin_id, user_id, } = req.body;

    try {
      const mems = await getMems(user_id);
      if (!mems) {
        return res.json({ succes: false, msg: "dont find user" })
      }
      conversations_document = await Conversation.findById(mongoose.Types.ObjectId(conversation_id))
      if (conversations_document.is_group && conversations_document.admin.toString() === admin_id.toString()) {
        conversation = await Conversation.updateOne({ _id: mongoose.Types.ObjectId(conversation_id) }, { $addToSet: { members: mems } })
        return res.json({ success: true, 'msg': 'add mems complie' })
      } else {
        return res.json({ sucess: false, "msg": "is not group or this user do not permission" })
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, 'msg': 'Something is wrong' })
    }



  }),
  removeMems: asyncHandler(async (req, res) => {
    const { conversation_id, admin_id, user_id } = req.body;
    console.log(conversation_id)
    try {
      const conversations_document = await Conversation.findById(mongoose.Types.ObjectId(conversation_id))
      console.log(conversations_document);
      if (conversations_document.is_group && conversations_document.admin.toString() === admin_id.toString()) {
        await conversations_document.update({ $pull: { members: { user_id: user_id } } })
        return res.json({ 'msg': 'remove complie' })
      } else {
        return res.json({ sucess: false, "msg": "is not group or this user do not permission" })
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, "msg": "Something is wrong" })
    }



  }),
  requestToGroup: asyncHandler(async (req, res) => {
    const { conversation_id, user_id } = req.body;

    conversations_document = await Conversation.findById(conversation_id);
    try {
      if (conversations_document.is_group === true) {
        await conversations_document.update({ $addToSet: { requests: mongoose.Types.ObjectId(user_id) } })
        return res.json({ success: true, 'msg': 'you request success' })
      } else {
        return res.json({ sucess: false, "msg": "is not group", err: err })
      }
    } catch (err) {
      console.log(err)
      return res.json({ sucess: false, err: err })
    }

  }),
  acceptRequest: asyncHandler(async (req, res) => {
    const { conversation_id, user_id, admin_id } = req.body
    console.log(user_id)

    try {
      const conversations_document = await Conversation.findById(conversation_id);
      const mems = await getMems(user_id);

      if (conversations_document.is_group) {

        await conversations_document.update({ $pull: { requests: { user_id: [user_id] } } })
        await conversations_document.update({ $addToSet: { members: mems } })
        return res.json({ success: true, 'msg': 'you accpet success' })
      } else {
        return res.json({ sucess: false, "msg": "is not group" })
      }
    } catch (err) {
      console.log(err)
      return res.json({ sucess: false, "msg": "accept fail" })
    }


  }),
}

module.exports = groupChatController;