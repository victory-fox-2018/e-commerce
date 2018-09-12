const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  description: String,
  price: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {
  timestamps: true
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item