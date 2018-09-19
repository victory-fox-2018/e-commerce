const Item = require('../models/item')
const Category = require('../models/category')

module.exports = {
    addItem: (req, res) => {
        Item
            .create({
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                tag: req.body.tag
            })
            .then(item => {
                Category
                    .findOne({
                        name: item.tag
                    })
                    .then(category => {
                        console.log(category);
                        if(category){
                            Category
                                .updateOne({
                                    name: item.tag
                                },{
                                    $push:{
                                        itemId: item._id
                                    }
                                })
                                .populate('Item' , 'name')
                                .then(() => {
                                    Category
                                        .find()
                                        .populate('itemId', 'name')
                                        .then(updatedCategory => {
                                            res.status(201).json({
                                                msg: `add item & update category success`,
                                                data: updatedCategory
                                            })
                                        })
                                })
                        }else{
                            Category
                                .updateOne({
                                    name: 'Others   '
                                },{
                                    $push:{
                                        itemId: item._id
                                    }
                                })
                                .populate('Item' , 'name')
                                .then(() => {
                                    Category
                                        .find()
                                        .populate('itemId', 'name')
                                        .then(updatedCategory => {
                                            res.status(201).json({
                                                msg: `add item & update others category success`,
                                                data: updatedCategory
                                            })
                                        })
                                })
                        }
                    })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    allItem: (req, res) => {
        Item
            .find()
            .then(items => {
                res.status(200).json({
                    items
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    filterItem: (req, res) => {
        Item
            .find({
                tag: req.params.name
            })
            .then(items => {
                res.status(200).json({
                    items
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    getItem: (req, res) => {
        Item.findOne({
            _id: req.params.id
        })
            .then(item => {
                res.status(200).json(item)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}