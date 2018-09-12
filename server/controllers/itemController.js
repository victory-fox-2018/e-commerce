const Item = require('../models/item')

module.exports = {

    findAll: function(req,res){
        Item.find()
        .populate('category')
        .then(function(items){
            res.status(200).json({
                items
            })
        })
    },

    create : function(req,res){
        let dataItem = new Item({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.categoryId
        })

        dataItem.save()
        .then(function(){
            res.status(200).json({
                message : `create item success`
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `create item failed`
            })
        })
    },

    update: function(req,res){
        Item.findByIdAndUpdate(req.params.id,{
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.categoryId
        })
        .then(function(){
            res.status(200).json({
                message : `Update item success`
            })
        })
        .catch(function(){
            res.status(200).json({
                message : `Update item failed`
            })
        })
    },

    remove: function(req,res){
        
        Item.deleteOne({
            _id : req.params.id
        })
        .then(function(){
            res.status(200).json({
                message : `delete item success`
            })
        })
        .catch(function(){
            res.status(404).json({
                message : `delete item failed`
            })
        })

    },

    filterByCategory: function(req,res){
        Item.find({category : req.params.id})
        .populate('category')
        .then(function(items){
            res.status(200).json({
                items
            })
        })
    }

}