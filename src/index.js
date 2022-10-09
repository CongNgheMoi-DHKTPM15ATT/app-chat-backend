const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { connectDatabase } = require('./utils/connectDB');
const socketApi = require('./utils/Socket')

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');

const verifyToken = require('./middlewares/auth');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(morgan('combined'));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

const server = require('http').createServer(app);
socketApi.io.attach(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});


// Route
app.get('/', (req, res) => {
  res.send("haha")
})

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/messages', messageRoute);

server.listen(process.env.PORT, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});