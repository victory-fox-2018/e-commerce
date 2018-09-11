const Category = require('../models/category');
const objectId = require('../helpers/objectId');

module.exports = {
  findAll: (req, res) => {
    Category.find()
    .then(categories => {
      res.status(200).json({
        message: 'success get all categories',
        categories: categories
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })
  },

  findById: (req, res) => {
    let id = objectId(req.params.id);

    Category.findOne({_id: id})
    .then(category => {
      res.status(200).json({
        message: 'success get category by id',
        category: category
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  },

  create: (req, res) => {
    let input = {
      name: req.body.name
    }

    Category.create(input)
    .then(newCategory => {
      res.status(201).json({
        message: 'success create new category',
        category: newCategory
      });
    })
    .catch(err => { 
      res.status(500).json({
        message: err.message
      });
    });
  },

  update: (req, res) => {

  },

  remove: (req, res) => {

  }
}