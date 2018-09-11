const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  listItem: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  totalPrice: Number
}, {timestamps: true});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;