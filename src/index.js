const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require("multer");

const { connectDatabase } = require('./utils/connectDB');
const socketApi = require('./utils/Socket')
const { s3Uploadv2, s3Uploadv3 } = require("./utils/S3Service");

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

const upload = multer({
  limits: { fileSize: 1000000000, files: 2 },
});

app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    return res.json({ status: "success", results });
  } catch (err) {
    console.log(err);
  }
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversation', conversationRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

server.listen(process.env.PORT || 3068, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});