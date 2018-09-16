const Item = require('../models/items')

const createItem = function (req, res) {
    let { name, description, price, category } = req.body
    // let image = req.file.originalname
    Item.create({
        name: name,
        description: description,
        price: price,
        category: category,
        image: req.body.image
    })
        .then(function (newItem) {
            res.status(200).json({
                message: "create item success",
                data: newItem
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "create item failed",
                error: err.message
            })
        })
}

const deleteItem = function (req, res) {
    Item.findOneAndRemove({
        _id: req.params.id
    })
        .then(function (deleteItem) {
            if (deleteItem) {
                res.status(200).json({
                    message: "delete item success",
                    data: deleteItem
                })
            } else {
                res.status(400).json({
                    message: "item not found"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "delete item failed",
                error: err.message
            })
        })
}


const getAllItem = function (req, res) {
    Item.find({})
        .then(function (items) {
            res.status(200).json({
                message: "data item found",
                data: items
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "data item not found",
                error: err.message
            })
        })
}

const getOneItem = function (req, res) {
    Item.findOne({
        _id: req.params.id
    })
        .then(function (item) {
            res.status(200).json({
                message: "data found",
                data: item
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "data not found",
                error: err.message
            })
        })
}

const getCategoryItem = function (req, res) {
    console.log('masuuk');
    
    console.log(req.params.category);
    
    Item.find({ category: req.params.category })
        .then(function (items) {
            res.status(200).json({
                message: "data category found",
                data: items
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message:"data category not found",
                error:err.message
            })
        })
}

module.exports = { createItem, deleteItem, getAllItem, getOneItem, getCategoryItem  }