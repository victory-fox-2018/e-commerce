const Category = require('./../models/category')
const objId= require('mongodb').ObjectID


module.exports = {

    createOne: function (req, res) {
        const newCategory = new Category({
            name: req.body.name
        })

        newCategory.save(function (err) {
            if (!err) {
                res.status(200).json({
                    msg: "New data has been added"
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        });
    },

    findAll: function (req, res) {
        Category.find(function (err, data) {
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
            name: req.body.name
        }

        Category.updateOne({
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
        Category.deleteOne({
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