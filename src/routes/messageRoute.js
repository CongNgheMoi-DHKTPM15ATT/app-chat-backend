const express = require('express');
const messageController = require('./../controllers/messageController');

const messageRoute = express.Router();

// /api/messages/send
messageRoute.post('/send', messageController.save);
// messageRoute.get('/lastMessages', messageController.getLastMessages);
messageRoute.post('/conversation', messageController.getMessageByConversation);

module.exports = messageRoute;