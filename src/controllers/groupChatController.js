const asyncHandler = require('express-async-handler');
const GroupChat = require('./../models/GroupChat.js');
const Conversation = require('./../models/Conversation.js');
const { getMems } = require('./../utils/conversationService');
const BaseRepository = require('./../repositories/BaseRepository');

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
    const { conversation_id, user_id } = req.body;

    const mems = await getMems(user_id);
    conversations_document = await Conversation.findById(conversation_id)
    if (conversations_document.is_group) {
      await conversations_document.update({ $addToSet: { members: mems } })
    } else {
      return res.json({ "msg": "is not group" })
    }
    return res.json({ 'msg': 'add mems complie' })

  }),
  removeMems: asyncHandler(async (req, res) => {
    const { conversation_id, user_id } = req.body;


    conversations_document = await Conversation.findById(conversation_id)
    if (conversations_document.is_group) {
      await conversations_document.update({ $pull: { members: { user_id: user_id } } })
    } else {
      return res.json({ "msg": "is not group" })
    }
    return res.json({ 'msg': 'remove complie' })

  })
}

module.exports = groupChatController;