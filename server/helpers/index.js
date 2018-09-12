const ObjectId = require('mongoose').Types.ObjectId
const { verify } = require('./jwt.js')
const User = require('../models/User')
module.exports = {
    authen: function(req,res,next){
    let token = req.headers.token
        // console.log(token)
        verify(token)
        .then(decoded =>{
            // console.log(decoded)
            if(decoded){
                return User.findOne({
                    _id: ObjectId(decoded.id),
                    email: decoded.email
                })
            }else{
                res.status(401).json({
                    message: 'USER NOT FOUND'
                })
            }
        })
        .then(userDb =>{
            if(userDb){
                next()
            }else{
                res.status(401).json({
                    message: 'USER NOT FOUND'
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
        
    }
}