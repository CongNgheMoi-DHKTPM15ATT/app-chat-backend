const asyncHandler require('express-async-handler');
const GroupChat require('./../models/GroupChat.js');

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

  }),

}

export default groupChatController;