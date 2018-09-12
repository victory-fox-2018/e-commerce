const Product = require('../models/product');
const Category = require('../models/category');
const objectId = require('../helpers/objectId');

module.exports = {
  findAllwithCategory: (req, res) => {
    let id = objectId(req.params.id);

    Category.findOne({_id: id}).populate({
      path: 'productId'
    })
    .then(products => {
      res.status(200).json({
        message: 'success get all categories',
        products: products
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })
  },

  findAll: (req, res) => {
    Product.find()
    .then(products => {
      res.status(200).json({
        message: 'success get all products',
        products: products
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })
  },

  // findById: (req, res) => {
  //   let id = objectId(req.params.id);

  //   Product.findOne({_id: id})
  //   .then(category => {
  //     if(!category) {
  //       res.status(500).json({
  //         message: 'no category data with this id'
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: 'success get category by id',
  //         category: category
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       message: err.message
  //     });
  //   });
  // },

  create: (req, res) => {
    let input = {
      name: req.body.name,
      price: req.body.price,
      seller: req.body.seller,
      area: req.body.area
    }
    let categoryId = objectId((!req.body.category) ? '5b974144de72fb64afe6d91e' : req.body.category);

    Product.create(input)
    .then(newProduct => {
      Category.update({_id: categoryId}, { $push: { productId: newProduct._id } })
      .then(affected => {
        res.status(201).json({
          message: 'success create new product',
          product: newProduct
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
    })
    .catch(err => { 
      res.status(500).json({
        message: err.message
      });
    });
  }

  // update: (req, res) => {
  //   let id = objectId(req.params.id);
  //   let input = {
  //     name: req.body.name
  //   }

  //   Product.findOneAndUpdate({_id: id}, input)
  //   .then(oldProduct => {
  //     if(!oldProduct) {
  //       res.status(500).json({
  //         message: 'no category data with this id'
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: 'success update category',
  //         oldProduct: oldProduct
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       message: err.message
  //     });
  //   });
  // },

  // remove: (req, res) => {
  //   let id = objectId(req.params.id);

  //   Product.findOneAndRemove({_id: id})
  //   .then(oldProduct => {
  //     if(!oldProduct) {
  //       res.status(500).json({
  //         message: 'no category data with this id'
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: 'success remove category',
  //         oldProduct: oldProduct
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       message: err.message
  //     });
  //   });
  // }
}