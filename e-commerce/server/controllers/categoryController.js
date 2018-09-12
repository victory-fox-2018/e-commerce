const Category = require('../models/Category');

module.exports = {
    
    createOne: (req, res) => {
        Category.create({name: req.body.name})
        .then( result => res.status(201).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    getAll: (req, res) => {
        Category.find({})
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    updateOne: (req, res) => {
        Category.findOneAndUpdate({_id:req.params.id}, {name: req.body.id})
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    },

    deleteOne: (req, res) => {
        Category.findOneAndRemove({_id:req.params.id})
        .then( result => res.status(200).json({result}))
        .catch( err => res.status(500).json({err}))
    }

};