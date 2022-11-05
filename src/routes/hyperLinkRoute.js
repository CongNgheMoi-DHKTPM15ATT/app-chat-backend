const express = require('express');
const hyperLinkController = require('./../controllers/hyperLinkController');

const hyperLinkRoute = express.Router();

hyperLinkRoute.post('/generate-link', hyperLinkController.generateLink);
hyperLinkRoute.post('/generate-qr', hyperLinkController.generateQr);



module.exports = hyperLinkRoute;