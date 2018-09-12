const ObjectId = require('mongodb').ObjectId;
const Category = require('../models/categoryModel')

module.exports = {
    
    show: function (req, res) {
        Category.find({})
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    add: function (req, res) {
        Category.create({
            name: req.body.name
        })
        .then(() => {
            res.status(201).json({message: 'New category added. Run live-server on the client directory to see the changes.'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    edit: function (req, res) {
        Category.updateOne({
            _id: ObjectId(req.body.id)
        }, {
            name: req.body.name
        })
        .then(() => {
            res.status(200).json({message: 'Category data updated. Run live-server on the client directory to see the changes.'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    remove: function (req, res) {
        Category.deleteOne({
            _id: ObjectId(req.body.id)
        })
        .then(() => {
            res.status(200).json({message: `Category '${req.body.id}' deleted. Run live-server on the client directory to see the changes.`})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
}