const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    item : {
        type : String,
        required : `Please input your item name`
    },
    price : {
        type : Number,
        required : `Please input your item price`
    },
    description : {
        type : String,
        required : `Please input item description`
    },
    tag : [String]
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item