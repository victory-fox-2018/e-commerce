const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listItem: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    totalPrice: {
        type: Number,
        default: 0,
        minimum: 0
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction