const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    itemId: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    total : Number

},{
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart