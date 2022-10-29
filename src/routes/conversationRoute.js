const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Conservation:
 *       type: object
 *       properties:
 *         _id: 
 *           type: object
 *           description: The auto-generated id
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user_id: 
 *                 type: string
 *               nick_name:
 *                 type: string
 *         receiver:
 *           type: string
 *         is_room:
 *           type: boolean
 *         last_message:
 *           type: string
 *         seen_last_message:
 *           type: boolean
 *       example:
 *         _id: ObjectId('634255ff21fbe65180fa2f07')
 *         members: [{user_id: 634283e662e59562ae46d1f4,nick_name: Felix Hayes DDS}, {user_id: 634255ff21fbe65180fa2f07,nick_name: nguyenhainam_01},{user_id: 7394b5f21fbe65180fa2cc65,nick_name: nguyenhainam_02}]
 *         receiver: ObjectId('634255ff21s83j5180fa2f07')
 *         is_room: true
 *         last_message: ObjectId('634255ff21fbe65189smw307')
 *         seen_last_message: false
 */


/**
 *  @swagger
 *  /conversaion:
 *    post:
 *      summary: Get conversation by user_id
 *      tags: [Conversation]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by user_id
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example:
 *                "conversations": [
 *                   {
 *                       "_id": "634a847f71044545e3e5408d",
 *                       "is_room": false,
 *                       "seen_last_messages": false,
 *                       "receiver": {
 *                           "_id": "634255ff21fbe65180fa2f07",
 *                           "nick_name": "App chat 003",
 *                           "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
 *                       },
 *                       "last_message": {
 *                           "_id": "634a855271044545e3e54094",
 *                           "content": "hello bn",
 *                           "content_type": "text",
 *                           "deleted": false,
 *                           "createdAt": "2022-10-15T10:02:58.474Z"
 *                       }
 *                   },
 *                 ]
 */
conversationRoute.post('', conversationController.getAllByUser);
/**
 *  @swagger
 *  /conversaion/create:
 *    post:
 *      summary: create conversation
 *      tags: [Conversation]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: list user
 *          schema:
 *            properties:
 *              user_id:
 *                type: array
 *                items:
 *                  item:
 *                    type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example:
 *                _id: ObjectId('634255ff21fbe65180fa2f07')
 *                members: [{user_id: 634283e662e59562ae46d1f4,nick_name: Felix Hayes DDS}, {user_id: 634255ff21fbe65180fa2f07,nick_name: nguyenhainam_01},{user_id: 7394b5f21fbe65180fa2cc65,nick_name: nguyenhainam_02}]
 *                receiver: ObjectId('634255ff21s83j5180fa2f07')
 *                is_room: true
 *                last_message: ObjectId('634255ff21fbe65189smw307')
 *                seen_last_message: false
 *                 
 */
conversationRoute.post('/create', conversationController.create);

/**
 *  @swagger
 *  /conversaion/create-group:
 *    post:
 *      summary: create conversation
 *      tags: [Conversation]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: list user
 *          schema:
 *            properties:
 *              user_id:
 *                type: array
 *                items:
 *                  item:
 *                    type: string
 *              group_name:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "_id": ObjectId('635be29309653ebd45073aea'),
 *                "members": [
 *                  {
 *                    "user_id": "635019423798ef92e00ef1d8",
 *                     "nick_name": "Ngô Đình Bảo Yến"
 *                  },
 *                  {
 *                    "user_id": "635441c920761d1e0bc698a4",
 *                    "nick_name": "Phạm Thanh Ngân"
 *                  },
 *                  {
 *                    "user_id": "63501bac6f230931f6ada8ea",
 *                    "nick_name": "A N H T H Ư"
 *                  }
 *                ],
 *                "receiver": {
 *                  "_id": ObjectId('635be29209653ebd45073ae8'),
 *                  "nick_name": "Yến, Ngân,...",
 *                  "avatar": "data:image/png;base64,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",
 *                  "createdAt": "2022-10-28T14:09:22.545Z",
 *                  "updatedAt": "2022-10-28T14:09:22.545Z",
 *                  "__v": 0
 *                },
 *                "is_group": true,
 *                "seen_last_messages": false,
 *                "createdAt": "2022-10-28T14:09:23.023Z",
 *                "updatedAt": "2022-10-28T14:09:23.023Z",
 *              }
 *                 
 */

conversationRoute.post('/create-group', conversationController.createGroup);

module.exports = conversationRoute;