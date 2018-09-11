const ItemCat = require('../models/ItemCat')

class Controller {
  
  static getItemCat(req, res) {
    ItemCat.find()
      .populate('items')
      .then(itemCat => {
        res.status(200).json(itemCat)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static create(req, res) {
    ItemCat.create(req.body)
      .then(() => {
        res.status(201).json({message: 'Category created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static update(req, res) {
    
  }
  
}

module.exports = Controller