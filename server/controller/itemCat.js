const ItemCat = require('../models/ItemCat')
const mongoose = require('mongoose')

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
    ItemCat.updateOne({_id: req.params.id}, req.body)
      .then(() => {
        res.status(200).json({message: 'Category updated!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static remove(req, res) {
    ItemCat.deleteOne({_id: req.params.id})
      .then(() => {
        res.status(200).json({message: 'Category deleted!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller