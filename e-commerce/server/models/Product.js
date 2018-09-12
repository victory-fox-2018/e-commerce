const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({ 
    name: String,
    price: Number,
    stock: Number,
    img: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
},{
    timestamps:true     
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product

// By Asrul Harahap - 2018
