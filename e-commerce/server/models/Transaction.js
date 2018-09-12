const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({ 
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    pay: {type: Boolean, default: false},
    status: {type: String, default: 'unpaid'},
    products: []
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction