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

app.use(cors());

const server = require('http').createServer(app);
socketApi.io.attach(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Route
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/messages', messageRoute);

server.listen(process.env.PORT, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});