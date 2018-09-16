const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },

},{
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart