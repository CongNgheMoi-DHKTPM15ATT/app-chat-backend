const express = require('express');
const userController = require('./../controllers/userController');

const userRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: ObjectId
 *           description: The auto-generated id
 *         user_name:
 *           type: string
 *           description: user name
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         avatar:
 *           type: string
 *         birthday:
 *           type: string
 *         friends:
 *           type: object
 *           properties:
 *              user_id:
 *                type: string
 *              status:
 *                type: string
 *                description: pending | friended | block
 *       example:
 *         _id: ObjectId('634255ff21fbe65180fa2f07')
 *         user_name: Omnibus
 *         password: $2b$10$kxMXixPLRUHUDK76jbj.ButBCOs.beZINQWO.OO19TFLOF5Rek6Sm
 *         email: omnibus@gmail.com
 *         birth_day: 2022-10-09T05:02:55.735+00:00
 *         friends: [{user_id: ObjectId('634269dc94c619b6b3671246'), status: friended}, {user_id: ObjectId('634283e662e59562ae46d1f3'), status: pending}]
 */

userRoute.post('/add-friend', userController.addFriend);

userRoute.post('/search', userController.searchUser);
// userRoute.post('/list', userController.getAll);

module.exports = userRoute;