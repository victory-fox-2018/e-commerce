const Category = require('../models/Category');

module.exports = {
  create: (req, res) => {
    const newCategory = new Category({
      name: req.body.name
    });

    newCategory
      .save()
      .then(category => {
        res.status(200).json({
          message: `${category.name} has been insert into Categories`
        })
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  update: (req, res) => {
    Category
      .where({_id: req.params.id})
      .update({
        name: req.body.name
      })
      .then(updated => {
        if(updated.n) {
          res.status(200).json({
            message: `Category has been updated`
          })
        } else {
          res.status(400).json({
            message: `Category not found`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  remove: (req, res) => {
    Category
      .deleteOne({_id: req.params.id})
      .then(deleted => {
        if(deleted.n) {
          res.status(200).json({
            message: `Category has been deleted`
          })
        } else {
          res.status(400).json({
            message: `Category not found`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  read: (req, res) => {
    Category 
      .find({})
      .then(categories => {
        res.status(200).json({ categories });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  }

};