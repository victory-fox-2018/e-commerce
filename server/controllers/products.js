const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

module.exports = {
    
    showAll: function (req, res) {
        Product.find({})
        .populate('category')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    showByCategory: function (req, res) {
        Category.findOne({
            name: req.body.category
        })
        .then(datum => {
            Product.find({
                category: datum._id
            })
            .populate('category')
            .then(data => {
                res.status(200).json({data: data})
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    add: function (req, res) {
        if (!req.body.category) {
            req.body.category = "New"
        }
        Category.findOne({
            name: req.body.category
        })
        .then(category => {
            Product.findOne({name: req.body.name})
            .then(data => {
                if (data) {
                    res.status(500).json({message: 'The product has been registered before.'})
                } else {
                    Product.create({
                        name: req.body.name,
                        price: req.body.price,
                        category: category._id
                    })
                    .then(() => {
                        res.status(201).json({message: 'New product added. Run live-server on the client directory to see the changes.'})
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                    })
                }
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    edit: function (req, res) {
        Product.updateOne({
            _id: ObjectId(req.body.id)
        }, {
            name: req.body.name
        })
        .then(() => {
            res.status(200).json({message: 'Product data updated. Run live-server on the client directory to see the changes.'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    remove: function (req, res) {
        Product.deleteOne({
            _id: ObjectId(req.body.id)
        })
        .then(() => {
            res.status(200).json({message: `Product '${req.body.id}' deleted. Run live-server on the client directory to see the changes.`})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
}