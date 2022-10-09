const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

conversationRoute.get('/user', conversationController.getAllByUser);

export default conversationRoute;