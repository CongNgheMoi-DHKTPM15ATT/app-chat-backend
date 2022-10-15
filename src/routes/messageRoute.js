const express = require('express');
const messageController = require('./../controllers/messageController');

const messageRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id: 
 *           type: object
 *           description: The auto-generated id
 *         sender:
 *           type: object
 *         content:
 *           type: string
 *         content_type:
 *           type: string
 *           description: text | file | image | link
 *         deleted:
 *           type: boolean
 *         conservation:
 *           type: object
 */

/**
 *  @swagger
 *  /messages/send:
 *    post:
 *      summary: Send message
 *      tags: [Message]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by sender_id, conversation_id, text
 *          schema:
 *            type: object
 *            properties:
 *              sender_id:
 *                type: string
 *              conversation_id:
 *                type: string
 *              text:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example:
 *                _id: 634aea7c86f4e8e2702ce47c
 *                sender: 634255ff21fbe65180fa2f07
 *                content: hello bn
 *                content_type: text
 *                deleted: false
 *                conversation: 634a847f71044545e3e5408d
 *                createdAt: 2022-10-15T17:14:36.942Z
 *                updatedAt: 2022-10-15T17:14:36.942Z
 *                 
 */

// /api/messages/send
messageRoute.post('/send', messageController.save);

/**
 *  @swagger
 *  /messages:
 *    post:
 *      summary: get message by conversation_id
 *      tags: [Message]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: conversation_id
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example:
 *                "messages": [
 *                   {
 *                     "_id": "634a855271044545e3e54094",
 *                     "content": "th này láo giữ ta 12h trưa mai t đợi m ở cổng trường",
 *                     "content_type": "text",
 *                     "deleted": false,
 *                     "sender": {
 *                       "user_id": "634255ff21fbe65180fa2f07",
 *                       "nick_name": "nguyenhainam_01"
 *                     }
 *                   }
 *                ]
 *                 
 */

// messageRoute.get('/lastMessages', messageController.getLastMessages);
messageRoute.post('', messageController.getMessageByConversation);

module.exports = messageRoute;