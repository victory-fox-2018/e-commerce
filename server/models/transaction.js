const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    totalPrice : {
        type: Number,
    },
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    listItem : [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, {
    timestamps : true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction