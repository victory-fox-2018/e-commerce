const Category = require('../models/category')

module.exports = {
    addCategory: (req, res) => {
        Category
            .create({
                name: req.body.name,
                itemId: []
            })
            .then(category => {
                res.status(201).json({
                    msg: 'add category success',
                    data: category
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    allCategory: (req, res) => {
        Category
            .find()
            .then(categories => {
                res.status(200).json({
                    categories
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}