const express = require('express');
const groupChatController = require('./../controllers/groupChatController');

const conversationRoute = express.Router();

/**
 *  @swagger
 *  /group/add-mems:
 *    post:
 *      summary: Thêm thành viên vào phòng
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào list user_id và conversation_id và user_controle_id (user thực hiện hành động này)
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
 *              user_control_id:
 *                type: string
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
 *  /group/remove-mem:
 *    post:
 *      summary: kich thành viên ra khỏi phòng hoặc là tự rời nhóm
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào user_id và conversation_id và user_control_id (user thực hiện hành động này). Nếu rời khỏi nhóm đề user_control_id == user_id
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

/**
 *  @swagger
 *  /group/request:
 *    post:
 *      summary: Gửi requset vào group
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào user_id và conversation_id hoặc là link chỉ truyền 1 trong 2 (link hoặc conversation_id)
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id || link:
 *                type: string
 *              user_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "success": true,
 *                "msg": "you request success"
 *              }
 *
 */


conversationRoute.post('/request', groupChatController.requestToGroup);

/**
 *  @swagger
 *  /group/accept:
 *    post:
 *      summary: Gửi requset vào group
 *      tags: [Group Chat]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào user_id và conversation_id và user_controle_id (user thực thi hành động này)
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id || link:
 *                type: string
 *              user_id:
 *                type: string
 *              use_control_id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "success": true,
 *                "msg": "you accpet success"
 *              }
 *
 */


conversationRoute.post('/accept', groupChatController.acceptRequest);
module.exports = conversationRoute;