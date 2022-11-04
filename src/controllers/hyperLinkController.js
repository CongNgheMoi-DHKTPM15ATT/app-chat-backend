const asyncHandler = require("express-async-handler");
const User = require("./../models/User.js");
const { ObjectId } = require("mongoose");

const hyperLinkController = {
  generateLink: asyncHandler(async (req, res) => {

  }),
  generateQr: asyncHandler(async (req, res) => {

  })
};

module.exports = hyperLinkController;