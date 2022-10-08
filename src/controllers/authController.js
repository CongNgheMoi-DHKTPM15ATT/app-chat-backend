const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  register: asyncHandler(async (req, res) => {
    try {

      const { userName, password } = req.body;
      console.log(userName);
      const passwordEncoded = await bcrypt.hash(password, await bcrypt.genSalt(10))
      const createUser = new User({ userName, 'password': passwordEncoded })

      const newUser = await createUser.save();

      if (newUser) {
        res.status(201).json({
          'mess': 'create sucess',
          'data': createUser,
        })
      } else {
        res.status(400).json({
          'mess': 'fail create'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }),
  login: asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ userName, password: user.password }, process.env.JWT_SECRET_KEY)
        console.log(token);
        res.status(200).json({ message: "Sign in sucess", token: token, data: user });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  }),
  logout: asyncHandler(async (req, res) => {

  }),
}

module.exports = authController;