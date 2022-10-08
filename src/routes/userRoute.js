const express = require('express');
const userController = require('./../controllers/userController');

const userRoute = express.Router();

// userRoute.post('/add-friend', userController.getLastMessages);
userRoute.get('/list', userController.getAll);

module.exports = userRoute;