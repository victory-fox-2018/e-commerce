const Item = require('./../models/item')
const objId= require('mongodb').ObjectID


module.exports = {

    createOne: function (req, res) {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryId: req.body.categoryId
        })

        newItem.save(function (err) {
            if (!err) {
                res.status(200).json({
                    msg: "New data has been added"
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    findAll: function (req, res) {
        Item.find(function (err, data) {
            if (!err) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    filterAll: function (req, res) {
        let input= {
            categoryId: req.params.categoryId
        }

        Item.find(input, function (err, data) {
            if (!err) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    updateOne: function (req, res) {
        let newUpdate = {
            name: req.body.name,
            description: req.body.description,
            price: reg.body.price,
            categoryId: req.body.categoryId
        }

        Item.updateOne({
            _id: objId(req.params.id)
        }, newUpdate, function (err, data) {
            if (!err) {
                res.status(200).json({
                    msg: "Data has been updated",
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    deleteOne: function (req, res) {
        Item.deleteOne({
            _id: objId(req.params.id)
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    msg: "Data has been deleted"
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    }
}