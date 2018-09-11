const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill product name']
  },
  price: {
    type: Number,
    required: [true, 'Please fill product price']
  },
  seller: {
    type: String,
    required: [true, 'Please fill product seller']
  },
  area: {
    type: String,
    required: [true, 'Please fill product area']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;