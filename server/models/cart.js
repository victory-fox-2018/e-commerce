const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill category name']
  },
  customerId: {
    type: Schema.Types.ObjectId, ref: 'Customer'
  },
  productId: [
    {type: Schema.Types.ObjectId, ref: 'Product'}
  ]
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;