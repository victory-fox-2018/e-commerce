const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
      name: String,
      price: Number,
      stock: Number,
      store: String,
      imgurl: String
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item