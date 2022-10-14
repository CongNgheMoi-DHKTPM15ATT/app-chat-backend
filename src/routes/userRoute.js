const express = require('express');
const userController = require('./../controllers/userController');

const userRoute = express.Router();

userRoute.post('/add-friend', userController.addFriend);
// userRoute.post('/list', userController.getAll);

module.exports = userRoute;