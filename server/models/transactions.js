const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    itemList: [{
        ref: "Item",
        type: Schema.Types.ObjectId
    }],
    totalPrice:{
        type:Number,
        required:[true, "total price required"]
    }
}, {
        timestamps: true
    })

var Transaction = mongoose.model('Transaction', transactionSchema)



module.exports = Transaction