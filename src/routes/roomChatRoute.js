const express = require('express');
const groupChatController = require('./../controllers/groupChatController');

const conversationRoute = express.Router();

/**
 *  @swagger
 *  /group/add-mems:
 *    post:
 *      summary: Send message
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào mảng user_id và conversation_id
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id:
 *                type: string
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
 *              example: {
 *                "msg": "add mems complie"
 *              }
 *
 */

conversationRoute.post('/add-mems', groupChatController.addMems);

/**
 *  @swagger
 *  /group/add-mems:
 *    post:
 *      summary: Send message
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào user_id và conversation_id
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id:
 *                type: string
 *              user_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "msg": "remove complie"
 *              }
 *
 */

conversationRoute.post('/remove-mem', groupChatController.removeMems);
conversationRoute.post('/request', groupChatController.requestToGroup);
conversationRoute.post('/accept', groupChatController.acceptRequest);
module.exports = conversationRoute;