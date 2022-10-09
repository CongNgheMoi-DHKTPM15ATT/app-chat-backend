const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

conversationRoute.get('/', conversationController.index);

export default conversationRoute;