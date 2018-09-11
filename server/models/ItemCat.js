const mongoose = require('mongoose')

const itemCatSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      items : [{
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Item'
      }]
})

const ItemCat = mongoose.model('ItemCat', itemCatSchema)

module.exports = ItemCat