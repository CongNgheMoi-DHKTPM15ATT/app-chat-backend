const express = require('express');
const groupChatController = require('./../controllers/groupChatController');

const conversationRoute = express.Router();

conversationRoute.post('/add-mems', groupChatController.addMems);
conversationRoute.post('/remove-mem', groupChatController.removeMems);
module.exports = conversationRoute;