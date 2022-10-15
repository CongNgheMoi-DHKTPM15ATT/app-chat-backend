const express = require('express');
const authController = require('./../controllers/authController');

const authRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authencation
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register user
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters: 
 *      - in: body
 *        description: user sign in
 *        schema:
 *          type: object
 *          required:
 *            - user_name
 *            - password
 *            - email
 *            - phone
 *          properties:
 *            user_name: 
 *              type : string
 *            password:
 *              type : string
 *            email:
 *              type : string
 *            phone:
 *              type : string
 *    responses:
 *      200:
 *        description: OK
 *          
 */

authRoute.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login user
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters: 
 *      - in: body
 *        description: user sign in
 *        schema:
 *          type: object
 *          required:
 *            - user_name
 *            - password
 *          properties:
 *            user_name: 
 *              type : string
 *            password:
 *              type : string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          schema:
 *            example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJuZ3V5ZW5oYWluYW1fMDEiLCJwYXNzd29yZCI6IiQyYiQxMCRreE1YaXhQTFJVSFVESzc2amJqLkJ1dEJDT3MuYmVaSU5RV08uT08xOVRGTE9GNVJlazZTbSIsImlhdCI6MTY2NTc5MTg3NX0.ZthsqdpunCjosKyOeOrXKdcKON-4cuRd6KwPo8T6dmI
 *              data:
 *                _id: ObjectId('634255ff21fbe65180fa2f07')
 *                user_name: Omnibus
 *                password: $2b$10$kxMXixPLRUHUDK76jbj.ButBCOs.beZINQWO.OO19TFLOF5Rek6Sm
 *                email: omnibus@gmail.com
 *                birth_day: 2022-10-09T05:02:55.735+00:00
 *                friends: [{user_id: ObjectId('634269dc94c619b6b3671246'), status: friended}, {user_id: ObjectId('634283e662e59562ae46d1f3'), status: pending}]
 */
authRoute.post('/login', authController.login);

module.exports = authRoute;