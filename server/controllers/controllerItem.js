const Item = require('../models/modelItem')


module.exports = {


    createItem: (req, res) => {
        Item.create({
            item: req.body.item,
            price: req.body.price,
            category: req.body.category,
            userId : req.body.userId
        })
            .then(itemData => {
                res.status(201).json({
                    msg: 'data has been created',
                    data: itemData
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'create data failed',
                    error: err.message
                })
            })
    },

    readItem: (req, res) => {
        Item.find()
            .then(itemData => {
                res.status(200).json({
                    msg: 'find all data items',
                    data: itemData
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `failed get data items`,
                    error: err.message
                })
            })
    },

    updateItem: (req, res) => {
        let where = { _id: req.params.id }
        let value = {
            $set: {
                item: req.body.item,
                price: req.body.price,
            }
        }
        Item.update(where, value)
            .then(dataUser => {
                res.status(200).json({
                    msg: `Data has been Updated`,
                    data: dataUser
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    deleteItem: (req, res) => {
        let where = { _id: req.params.id }

        Item.deleteOne(where)
            .then(itemData => {

                res.status(200).json({
                    msg: `data has been deleted`,
                    data: itemData
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    }

}