const express = require('express');
const conversationController = require('./../controllers/conversationController');

const conversationRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Conservasion
 *   description: Conservation
 */

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
 *           type: object
 *         is_room:
 *           type: boolean
 *         last_message:
 *           type: object
 *         seen_last_message:
 *           type: boolean
 *       example:
 *         _id: ObjectId('634255ff21fbe65180fa2f07')
 *         members: [{user_id: 634283e662e59562ae46d1f4,nick_name: Felix Hayes DDS}, {user_id: 634255ff21fbe65180fa2f07,nick_name: nguyenhainam_01},{user_id: 7394b5f21fbe65180fa2cc65,nick_name: nguyenhainam_02}]
 *         receiver: ObjectId('634255ff21s83j5180fa2f07')
 *         is_room: 
 *         last_message: ObjectId('634255ff21fbe65189smw307')
 *         seen_last_message: 0
 */


/**
 *  @swagger
 *  /conversaion:
 *    post:
 *      summary: Get conversation by id
 *      tags: [Conversation]
 *      consumes:
 *        -application/json
 *      parameters:
 *        -in: body
 *        description: by user_id
 *        schema:
 *          type: object
 *          required:
 *            - user_id
 *          properties:
 *            user_id:
 *              type : string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            schema:
 *              example:
 *                _id: ObjectId('634255ff21fbe65180fa2f07')
 *                members: [{ user_id: 634283e662 e59562ae46d1f4, nick_name: Felix Hayes DDS }, { user_id: 634255 ff21fbe65180fa2f07, nick_name: nguyenhainam_01 }, { user_id: 7394 b5f21fbe65180fa2cc65, nick_name: nguyenhainam_02 }]
 *                receiver:
 *                  schema:
 *                    $ref: '#/components/schemas/User'
 *                is_room: true
 *                last_message: ObjectId('634255ff21fbe65189smw307')
 *                seen_last_message: false
 */




conversationRoute.post('', conversationController.getAllByUser);
conversationRoute.post('/create', conversationController.create);

module.exports = conversationRoute;