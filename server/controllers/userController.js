const User = require('../models/user')
const jwt  = require('jsonwebtoken')
const { generatePassword, checkPassword } = require('../helpers')

module.exports = {

    signup: function(req,res){

        generatePassword(req.body.email, req.body.password)
        .then(function(passwordhasGenerate){
            let dataUser = new User({
                name : req.body.name,
                gender : req.body.phoneNumber,
                address : req.body.address,
                email : req.body.email,
                password : passwordhasGenerate
            })
            return dataUser
        })
        .then(function(dataUser){
            dataUser.save()
            .then(function(user){
                res.status(200).json({
                    message : `Registrasi berhasil`
                })
            })
            .catch(function(err){
                res.status(500).json({
                    err
                })
            })
        })
        .catch(function(err){
            console.log(err)
        })   
    },

    signin: function(req,res){
        // console.log(req.body)
        let user = null
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            user = dataUser
            return checkPassword(dataUser.password, req.body.password, req.body.email)
        })
        .then(function(){
            jwt.sign({
                userId : user._id,
            }, process.env.ACCESS_DATA, function(err,token){
                if(!err){
                    res.status(200).json({
                        userId : user._id,
                        name : user.name,
                        email: user.email,
                        token : token
                    })
                } else {
                    res.status(500).json({
                        message : `Email and password didn't match`
                    })
                }
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `Email and password didn't match`
            })
        })
    },

    update: function(req,res){
        User.findByIdAndUpdate(req.userId, {
            name : req.body.name,
            gender : req.body.gender,
            phoneNumber : req.body.phoneNumber,
            address : req.body.address,
        })
        .then(function(){
            res.status(200).json({
                message : 'Data updated success'
            })
        })
    },

    remove: function(req,res){
        User.deleteOne({
            _id : req.userId
        })
        .then(function(){
            res.status(200).json({
                message : `User deleted success`
            })
        })
    }

}