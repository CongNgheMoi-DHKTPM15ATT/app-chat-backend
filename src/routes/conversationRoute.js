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

module.exports = conversationRoute;