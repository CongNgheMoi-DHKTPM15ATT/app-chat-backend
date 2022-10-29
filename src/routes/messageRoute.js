const express = require("express");
const messageController = require("./../controllers/messageController");
const Message = require("./../models/Message.js");

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
 *              content_type:
 *                 type: string
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
 *                content_type: text | file | image | link
 *                deleted: false
 *                conversation: 634a847f71044545e3e5408d
 *                createdAt: 2022-10-15T17:14:36.942Z
 *                updatedAt: 2022-10-15T17:14:36.942Z
 *
 */

// /api/messages/send
messageRoute.post("/send", messageController.save);

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
 *                     "content": "hello bn",
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

messageRoute.post("", messageController.getMessageByConversation);

messageRoute.post("/send", messageController.save);

/**
 *  @swagger
 *  /messages/recover:
 *    post:
 *      summary: Thu hồi tin nhắn
 *      tags: [Message]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền _id của message
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: id của message
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "msg": "Recover message successfully",
 *                "data": {
 *                  "_id": "6350176a007e713f9af0e383",
 *                  "sender": "6350171f007e713f9af0e356",
 *                  "content": "Tin nhắn đã dược thu hồi",
 *                  "content_type": "text",
 *                  "deleted": true,
 *                  "conversation": "6350175d007e713f9af0e377",
 *                  "createdAt": "2022-10-19T15:27:38.136Z",
 *                  "updatedAt": "2022-10-24T04:56:48.972Z",
 *                }
 *              }
 * 
 */

messageRoute.post("/recover", messageController.recovery);


/**
 *  @swagger
 *  /messages/content-type:
 *    post:
 *      summary: Lấy message theo loại message
 *      tags: [Message]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào conversation_id và content_type (image || file || link || system)
 *          schema:
 *            type: object
 *            properties:
 *              conversation_id:
 *                type: string
 *                description: id của conversation
 *              content_type:
 *                type: string
 *                description: content type của message
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: [
 *                 {
 *                   "_id": "6354d074ce999f889cff5ea3",
 *                   "sender": "63501bac6f230931f6ada8ea",
 *                   "content": "https://thu-viddeo-public.s3.amazonaws.com/1666502768958-rn_image_picker_lib_temp_d04adcec-dbea-4456-9656-2106d1eb20ae.jpg",
 *                   "content_type": "image",
 *                   "deleted": false,
 *                   "conversation": "63501cf06f230931f6ada94d",
 *                   "createdAt": "2022-10-23T05:26:12.537Z",
 *                   "updatedAt": "2022-10-23T05:26:12.537Z",
 *                   "__v": 0
 *                 },
 *                 {
 *                   "_id": "6354de01884a1d15b8a63919",
 *                   "sender": "63501bac6f230931f6ada8ea",
 *                   "content": "afk",
 *                   "content_type": "image",
 *                   "deleted": false,
 *                   "conversation": "63501cf06f230931f6ada94d",
 *                   "createdAt": "2022-10-23T06:24:01.037Z",
 *                   "updatedAt": "2022-10-23T06:24:01.037Z",
 *                   "__v": 0
 *                 },
 *               ]
 * 
 */
messageRoute.post("/content-type", messageController.getAllByContentType);




// route outline
// 
messageRoute.post("/delete-anything", async (req, res) => {

  //delete by convasation

  // const { conversation_id } = req.body;
  // console.log(conversation_id)
  // await Message.deleteMany({ conversation: conversation_id })
  // return res.json({ "msg": 'delete complie' })
  // 
  // delete by have sender 
  const mess = await Message.remove({ "sender": { "$exists": false } })
  return res.json({ mess })
});



module.exports = messageRoute;