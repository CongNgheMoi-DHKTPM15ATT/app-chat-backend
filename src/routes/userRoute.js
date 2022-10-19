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
 *                description: pending | friended | block | accepting
 *       example:
 *         _id: ObjectId('634255ff21fbe65180fa2f07')
 *         user_name: Omnibus
 *         password: $2b$10$kxMXixPLRUHUDK76jbj.ButBCOs.beZINQWO.OO19TFLOF5Rek6Sm
 *         email: omnibus@gmail.com
 *         birth_day: 2022-10-09T05:02:55.735+00:00
 *         friends: [{user_id: ObjectId('634269dc94c619b6b3671246'), status: friended}, {user_id: ObjectId('634283e662e59562ae46d1f3'), status: pending}]
 */

/**
 *  @swagger
 *  /user/send-friend-request:
 *    post:
 *      summary: send friend request
 *      tags: [User]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by sender_id, conversation_id
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *              receiver_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "_id": "63425fe9468cba4024ddb894",
 *                "user_name": "nguyenhainam_02",
 *                "birth_day": "2022-10-09T05:45:13.828Z",
 *                "friends": [],
 *                "phone": "0123456789",
 *                "createdAt": "2022-10-09T05:45:13.835Z",
 *                "updatedAt": "2022-10-09T05:45:13.835Z",
 *              }
 */

userRoute.post('/send-friend-request', userController.sendFriendRequest);

/**
 *  @swagger
 *  /user/confirm-friend-request:
 *    post:
 *      summary: send friend request
 *      tags: [User]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by sender_id, conversation_id
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *              receiver_id:
 *                type: string
 *              is_accept:
 *                type: boolean
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                messages: "Now! You already have a new friend"
 *              }
 */
userRoute.post('/confirm-friend-request', userController.confirmFriendRequest);

/**
 *  @swagger
 *  /user/search:
 *    post:
 *      summary: send friend request
 *      tags: [User]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by user_id, filter
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *              filter:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: [
 *                {
 *                  "_id": "63425fe9468cba4024ddb894",
 *                  "user_name": "nguyenhainam_02",
 *                  "birth_day": "2022-10-09T05:45:13.828Z",
 *                  "friends": [],
 *                  "phone": "0123456789",
 *                  "createdAt": "2022-10-09T05:45:13.835Z",
 *                  "updatedAt": "2022-10-09T05:45:13.835Z",
 *                  "nick_name": "nguyenhainam_02",
 *                  "conversation": "634a847f71044545e3e5408d"
 *                }
 *              ] 
 */

userRoute.post('/search', userController.searchUser);
userRoute.post('/id', userController.getById);

module.exports = userRoute;