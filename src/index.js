const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { connectDatabase } = require('./ultils/connect');

dotenv.config();

const app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route


const server = app.listen(process.env.PORT, () => {
  console.log(`Express running => PORT ${server.address().port}`);
  connectDatabase();
});