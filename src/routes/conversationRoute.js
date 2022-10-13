const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

conversationRoute.post('', conversationController.getAllByUser);
conversationRoute.post('/create', conversationController.create);

module.exports = conversationRoute;