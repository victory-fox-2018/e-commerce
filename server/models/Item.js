const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  description: String,
  img: String,
  price: Number
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;