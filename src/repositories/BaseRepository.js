const { model } = require('mongoose');
const UserResponse = require('./../responses/userResponse');

module.exports = class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async getAll(req, res) {
    console.log("strat get all")
    const docs = await model(this.model).find({});
    return res.json(doc);
  }

  async findById(req, res) {
    const { _id } = req.body;
    const doc = await model(this.model).findById(_id)
    return res.json(doc);
  }

  async update(req, res) {
    const { _id, data } = req.body
    await model(this.model).findByIdAndUpdate(_id, data);
    const doc = await model(this.model).findById(_id);
    console.log(doc)
    if (doc) {
      res.json(new UserResponse(doc).custom())
    } else {
      res.json(doc)
    }
  }

}