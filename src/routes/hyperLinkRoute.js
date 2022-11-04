const express = require('express');
const hyperLinkController = require('./../controllers/hyperLinkController');

const hyperLinkRoute = express.Router();

hyperLinkRoute.post('/generate-link', hyperLinkController.register);



module.exports = hyperLinkRoute;