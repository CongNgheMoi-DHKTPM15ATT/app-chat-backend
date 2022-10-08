const express = require('express');
const messageController = require('./../controllers/messageController');

const messageRoute = express.Router();

// /api/messages/send
messageRoute.post('/send', messageController.save);
messageRoute.get('/lastMessages', messageController.getLastMessages);

module.exports = messageRoute;