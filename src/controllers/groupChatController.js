const asyncHandler = require("express-async-handler");
const GroupChat = require("./../models/GroupChat.js");
const Conversation = require("./../models/Conversation.js");
const { getMems } = require("./../utils/conversationService");
const BaseRepository = require("./../repositories/BaseRepository");
const mongoose = require("mongoose");

const model = "GroupChat";

const baseRepository = new BaseRepository(model);

const setting = {
  isFreeEnter: "isFreeEnter",
  isFreeKickMem: "isFreeKickMem",
  isFreeEdit: "isFreeEdit",
};

const conversationRepository = {
  getAll: asyncHandler(async (req, res) => {
    await baseRepository.getAll(req, res);
  }),
  findById: asyncHandler(async (req, res) => {
    await baseRepository.findById(req, res);
  }),
  update: asyncHandler(async (req, res) => {
    const { conversation_id, user_control_id, user_id, data } = req.body;

    const conversation = await Conversation.findById(conversation_id);

    const wantPermission = [setting.isFreeEdit];

    if (checkPermissionGroup(conversation, user_control_id, wantPermission)) {
      conversation.update({ data });
    }
  }),
};

function checkPermissionGroup(conversation, user_control_id, wantPermission) {
  let checkModePermission = false;

  for (var i = 0; i < wantPermission.length; i++) {
    if (conversation.setting[wantPermission[i]] === true) {
      checkModePermission = true;
    } else {
      checkModePermission = false;
      break;
    }
  }
  return checkModePermission || conversation.admin === user_control_id;
}

const groupChatController = {
  ...conversationRepository,
  addMems: asyncHandler(async (req, res) => {
    const { conversation_id, user_control_id, user_id } = req.body;
    console.log(user_id);
    try {
      let mems;
      if (Array.isArray(user_id)) {
        mems = await getMems(user_id);
      } else {
        mems = await getMems([user_id]);
      }

      if (!mems) {
        return res.json({ succes: false, msg: "dont find user" });
      }
      permistionWanted = [setting.isFreeEnter];
      conversations_document = await Conversation.findById(
        mongoose.Types.ObjectId(conversation_id)
      );

      if (
        checkPermissionGroup(
          conversations_document,
          user_control_id,
          permistionWanted
        )
      ) {
        if (conversations_document.is_group) {
          conversation = await Conversation.updateOne(
            { _id: mongoose.Types.ObjectId(conversation_id) },
            { $addToSet: { members: mems } }
          );
          return res.json({ success: true, msg: "Add mems complie" });
        } else {
          return res.json({
            sucess: false,
            msg: "Is not group or this user do not permission",
          });
        }
      } else {
        await conversations_document.update({
          $addToSet: { requests: user_id },
        });
        return res.json({
          sucess: true,
          msg: "This user added to list request",
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, msg: "Something is wrong" });
    }
  }),
  removeMems: asyncHandler(async (req, res) => {
    const { conversation_id, user_control_id, user_id } = req.body;
    console.log(conversation_id);
    try {
      const conversations_document = await Conversation.findById(
        mongoose.Types.ObjectId(conversation_id)
      );
      // console.log(conversations_document);
      permistionWanted = [setting.isFreeKickMem];
      if (
        checkPermissionGroup(
          conversations_document,
          user_control_id,
          permistionWanted
        ) ||
        user_control_id === user_id
      ) {
        if (conversations_document.is_group) {
          await Conversation.updateOne(
            { _id: mongoose.Types.ObjectId(conversation_id) },
            { $pull: { members: { user_id: user_id } } }
          );
          return res.json({ msg: "remove complie" });
        } else {
          return res.json({
            sucess: false,
            msg: "is not group or this user do not permission",
          });
        }
      } else {
        res.json({ sucess: false, msg: "you no have permission" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, msg: "Something is wrong" });
    }
  }),
  requestToGroup: asyncHandler(async (req, res) => {
    const { conversation_id, user_id, link } = req.body;

    conversations_document = await Conversation.findById(conversation_id);
    const wantPermission = [setting.isFreeEnter];
    console.log(conversations_document);
    try {
      if (conversations_document.is_group === true) {
        if (conversations_document.setting[wantPermission[0]] === true) {
          await Conversation.updateOne(
            { _id: mongoose.Types.ObjectId(conversation_id) },
            { $addToSet: { members: mems } }
          );
          return res.json({ success: true, msg: "Now! you in this group" });
        } else {
          await conversations_document.update({
            $addToSet: { requests: mongoose.Types.ObjectId(user_id) },
          });
          return res.json({ success: true, msg: "you request success" });
        }
      } else {
        return res.json({ sucess: false, msg: "is not group", err: err });
      }
    } catch (err) {
      console.log(err);
      return res.json({ sucess: false, err: err });
    }
  }),
  acceptRequest: asyncHandler(async (req, res) => {
    const { conversation_id, user_id, user_control_id } = req.body;

    try {
      const conversations_document = await Conversation.findById(
        conversation_id
      );
      const mems = await getMems(user_id);

      const permistionWanted = [setting.isFreeEnter];
      if (
        checkPermissionGroup(
          conversations_document,
          user_control_id,
          permistionWanted
        )
      ) {
        if (conversations_document.is_group) {
          await conversations_document.update({
            $pull: { requests: { user_id: [user_id] } },
          });
          await conversations_document.update({ $addToSet: { members: mems } });
          return res.json({ success: true, msg: "you accpet success" });
        } else {
          return res.json({ sucess: false, msg: "is not group" });
        }
      } else {
        res.json({ sucess: false, msg: "you no have permission" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ sucess: false, msg: "accept fail" });
    }
  }),
};

module.exports = groupChatController;
