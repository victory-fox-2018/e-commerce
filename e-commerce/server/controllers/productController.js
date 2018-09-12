const Product = require('../models/Product')

module.exports = {
    // likes: { $in: ['vaporizing', 'talking'] }

    createOne: (req, res) => {
        let objProduct = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img,
            description: req.body.description,
            category: req.body.category
        }
        console.log(objProduct);
        Product.create(objProduct)
        .then( result => res.status(201).json({result}))
        .catch( err => res.status(500).json({err}))
    }, 

    getAll: (req, res) => {
        Product.find({})
        .populate('category')
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    getAllLike: (req, res) => {
        Product.find({category: req.params.like})
        .populate('category')
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    getAllPriceGT: (req, res) => {
        Product.find({price: { $gt: req.params.price} })
        .populate('category')
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    getAllPriceLT: (req, res) => {
        Product.find({price: { $lt: req.params.price} })
        .populate('category')
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    updateOne: (req, res) => {
        const objProduct = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img,
            description: req.body.description,
            category: req.body.category
        }
        Product.updateOne({_id:req.params.id}, objProduct)
        .then( result => res.status(201).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    deleteOne: (req, res) => {
        Product.deleteOne({_id:req.params.id})
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    }

}