const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: String,
    price: Number,
    description : String,
    category: {
        type: Schema.Types.ObjectId, 
        ref: "Category"
    }
}, {
    timestamps: true
})



const Item = mongoose.model('Item', itemSchema);

module.exports = Item