const Category = require('../models/category')

module.exports = {

    findAll: function(req,res){
        Category.find()
        .then(function(categories){
            res.status(200).json({
                categories
            })
        })
    },

    create: function(req,res){
        let dataCategory = new Category({
            name : req.body.name
        })

        dataCategory.save()
        .then(function(category){
            res.status(200).json({
                message : `Create category ${category.name} success`
            })
        })
    },

    update: function(req,res){  
        Category.findByIdAndUpdate(req.params.id, {
            name : req.body.name
        })
        .then(function(){
            res.status(200).json({
                message : `Update category success`
            })
        })
    },

    remove: function(req,res){

        Category.deleteOne({
            _id : req.params.id
        })
        .then(function(category){
            res.status(200).json({
                message : `Delete category success`
            })
        })

    }
}