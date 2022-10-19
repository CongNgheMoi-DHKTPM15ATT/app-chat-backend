const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { connectDatabase } = require('./utils/connectDB');
const socketApi = require('./utils/Socket')

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const conversationRoute = require('./routes/conversationRoute');

const verifyToken = require('./middlewares/auth');
const cors = require('cors');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

dotenv.config();

const app = express();
app.use(morgan('combined'));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

const server = require('http').createServer(app);
socketApi.io.attach(server);


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [{
      // url: "https://halo-chat.herokuapp.com/api",
      url: "http://localhost:8080/api",
    }, ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);


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
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
  res.send("haha")
})

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversation', conversationRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

server.listen(process.env.PORT || 3068, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});