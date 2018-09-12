const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('../models/Transaction')
const Item = require('../models/Item')
const User = require('../models/User')
const { verify } = require('../helpers/jwt')

module.exports = {
    getTransaction: function(req,res){
        let token = req.headers.token
        verify(token)
        .then(user =>{
            return Transaction.find({ userId: ObjectId(user.id)}).populate('itemsId')
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}