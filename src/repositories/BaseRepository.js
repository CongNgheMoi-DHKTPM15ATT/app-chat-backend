const { model } = require('mongoose');

module.exports = class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async getAll(req, res) {
    console.log("strat get all")
    const docs = await model(this.model).find({});
    return res.json({ docs });
  }

  async findById(req, res) {
    const { _id } = req.body;
    const doc = await model(this.model).findById(_id)
    return res.json({ doc });
  }

  async update(req, res) {
    const { _id, data } = req.body
    console.log(data)
    const doc = await model(this.model).findByIdAndUpdate(_id, data);
    if (doc) {
      res.json({ msg: 'update complie' })
    } else {
      res.json({ msg: 'update failed' })
    }
  }

}