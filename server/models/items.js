const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
    name: { type: String, required: [true, "item name required"] },
    description: { type: String, required: [true, "item description required"] },
    price: { type: Number, required: [true, "item price required"] },
    category: { type: String, required: [true, "item category required"] },
    image: { type: String }
}, {
        timestamps: true
    })


var Item = mongoose.model('Item', itemSchema)

module.exports = Item
