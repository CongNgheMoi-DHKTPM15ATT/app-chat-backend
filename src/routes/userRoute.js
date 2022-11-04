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
 *      summary: gửi yêu cầu kết bạn
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
 *      summary: chấp nhận/từ chối yêu cầu kết bn
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
 *      summary: lọc danh sách user
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

/**
 *  @swagger
 *  /user/id:
 *    post:
 *      summary: tìm kiếm user bằng _id
 *      tags: [User]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: by user_id, filter
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example: {
 *                "_id": "6350171f007e713f9af0e356",
 *                "user_name": "Nguyễn Thanh Thảo1",
 *                "birth_day": "2022-10-19T15:26:23.792Z",
 *                "friends": [
 *                  {
 *                    "user_id": "635016ea007e713f9af0e351",
 *                    "status": "FRIENDED"
 *                  },
 *                  {
 *                    "user_id": "63501f586f230931f6ada994",
 *                    "status": "FRIENDED"
 *                  },
 *                  {
 *                    "user_id": "63501ad03798ef92e00ef250",
 *                    "status": "FRIENDED"
 *                  },
 *                  {
 *                    "user_id": "635441c920761d1e0bc698a4",
 *                    "status": "PENDING"
 *                  }
 *                ],
 *                "phone": "0563880224",
 *                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABmJLR0QA/wD/AP+gvaeTAAACQklEQVR4nO3awQ3CQBAEwTMiWiIwERCBSdckgPqFfCdRFcF8WvvZbRz7OYCvbrMHwMoEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBALhPnvAqs7Ha/aES23v5+wJS3JBIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIGzj2M/ZI/7Frz6Efd5exwWBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAjbOPZz9ghYlQsCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAuEDZIwNtDtcerIAAAAASUVORK5CYII=",
 *                "createdAt": "2022-10-19T15:26:23.793Z",
 *                "updatedAt": "2022-10-24T07:34:01.512Z"
 *              }
 */

userRoute.post('/id', userController.getById);

userRoute.post('/confirm-friend-request', userController.confirmFriendRequest);

/**
 *  @swagger
 *  /user/get-friends-pending:
 *    post:
 *      summary: lọc danh sách user theo status
 *      tags: [User]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: truyền vào user_id, status (FRIENDED || PENDING || ACCEPTING || BLOCK)
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *              status:
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

userRoute.post('/get-friends-pending', userController.getFriendsPending);
userRoute.post('/remove-friend', userController.removeFriend);
userRoute.post('/block-friend', userController.blockFriend);
userRoute.post('/cancel-request-pending', userController.cancelRequestPending);


userRoute.post('/all', userController.getAll);
userRoute.post('/id', userController.getById);
userRoute.post('/update', userController.update);


module.exports = userRoute;