const mongoose = require('mongoose')

const itemCatSchema = new mongoose.Schema({
      name: String,
      items : [{
          type : Schema.Types.ObjectId,
          ref : 'Item'
      }]
})

const ItemCat = mongoose.model('ItemCat', itemCatSchema)

module.exports = ItemCat