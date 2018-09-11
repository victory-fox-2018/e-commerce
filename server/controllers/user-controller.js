const User = require('../models/user')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectID

module.exports = {
    get_user : function(req,res) {
        User.find()
        .then(function(users){
            res.status(200).json({
                users : users
            })
        })
        .catch(function(err){
            res.send(err)
        })
    },

    register : function(req,res) {
        let { name, email, password } = req.body
        User.create({
            name : name,
            email : email,
            password : password
        })
        .then(function(user){
            res.status(200).json({
                user : user
            })
        })
        .catch(function(err){
            res.status(500).json({
                message : err.message
            })
        })
    },

    update : function(req,res) {
        let { name, email, password } = req.body
        User.findOneAndUpdate({ _id: new ObjectId(req.params.id) },{
            name : name,
            email : email,
            password : bcrypt.hashSync(password,8)
        },{runValidators:true,context:'query'})
        .then(function(user){
            res.status(200).json({
                message: 'success'
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: err.message
            })
        })
    },

    delete_user : function(req,res) {
        User.deleteOne({ 
            _id : new ObjectId(req.params.id)
        })
        .then(function(){
            res.status(200).json({
                message : 'success'
            })
        })
        .catch(function(err){
            message : err.message
        })
    },
}