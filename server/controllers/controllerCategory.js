const Category = require('../models/modelCategory')
const mongodb = require('mongodb')

module.exports = {

    createCategory: (req, res) => {

        Category.create({
            category: req.body.category
        })
            .then(categoryData => {
                res.status(201).json({
                    msg: `Category has been created`,
                    data: categoryData
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    readCategory: (req, res) => {

        Category.find()
            .populate('items')
            .exec((err, categoryData) => {
                if (err) res.status(500).json({ error: err.message })

                else {
                    res.status(200).json({
                        msg: `Success get Category Data`,
                        data: categoryData
                    })
                }
            })
    },

    deleteCategory: (req, res) => {

        Category.deleteOne({
            _id: new mongodb.ObjectId(req.params.id)
        })
            .then(categoryData => {
                res.status(200).json({
                    msg: `Data has been deleted`,
                    data: categoryData
                })
            })
            .catch(err => {
                res.status(200).json({ error: err.message })
            })
    },

    updateCategory: (req, res) => {

        let where = { _id: new mongodb.ObjectId(req.params.id) }
        let value = {
            $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            },
            $push: {
                items: req.body.items
            }
        }

        Category.findOneAndUpdate(where, value)
            .then(categoryData => {
                res.status(200).json({
                    msg: 'success updating data',
                    data: categoryData
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                });
            });
    }

}