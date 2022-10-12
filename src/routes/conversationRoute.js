const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

conversationRoute.post('/user', conversationController.getAllByUser);
conversationRoute.post('/create', conversationController.create);

module.exports = conversationRoute;