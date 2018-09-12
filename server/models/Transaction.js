const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    totalPrice: Number,
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    itemsId: [{
        type: Schema.Types.ObjectId, 
        ref: "Item"
    }]
}, {
    timestamps: true
})



const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction