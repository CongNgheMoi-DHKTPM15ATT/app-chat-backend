const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { connectDatabase } = require('./ultils/connect');
const authRoute = require('./routes/authRoute');
const verifyToken = require('./middlewares/auth');

dotenv.config();

const app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', verifyToken, (req, res) => {
  res.send('asdasd');
})

// Route
app.use('/auth', authRoute);

const server = app.listen(process.env.PORT, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});