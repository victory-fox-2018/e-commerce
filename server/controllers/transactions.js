const Transaction = require('../models/transactions')
const User = require('../models/users')

const addTransaction = function (req, res) {

    User.findOne({ email: req.user.email })
    
    .then(function (user) {
        console.log('masuuk find then');
            if (user) {
                let listItem = []
                req.body.itemList.forEach(element => {
                    listItem.push(element._id)
                });

                Transaction.create({
                    user: req.user.id,
                    itemList: listItem,
                    totalPrice: req.body.totalPrice
                })
                    .then(function (newTransaction) {
                        res.status(200).json({
                            message: "add Transaction succes",
                            data: newTransaction
                        })
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "add Transaction failed",
                            error: err.message
                        })
                    })
            } else {
                res.status(400).json({
                    message: "you are not authorized",
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "user not found",
                error: err.message
            })
        })

}

const getAllTransaction = function (req, res) {

    User.findById(req.user.id)
    .then(function (user) {
        if (user) {
            Transaction.find({ user : req.user.id })
            .populate(['user', 'itemList'])
            .then(function (Transactions) {
                res.status(200).json({
                    message: "data found",
                    data: Transactions
                })
            })
            .catch(function (err) {
                res.status(400).json({
                    message: "error get data",
                    error: err.message
                })
            })
        } else {
            res.status(400).json({
                message: "you are not authorized",
            })
        }
    })
    
    .catch(function (err) {
        res.status(400).json({
            message:"user not found",
            error:err.message
        })
    })
}

const getOneTransaction = function (req, res) {

    User.findById(req.user.id)
    .then(function(user){
        if(user){

            Transaction.findOne({
                _id: req.params.id
            })
            .populate(['user', 'itemlist'])
            .then(function (Transaction) {
                res.status(200).json({
                    message: "data Transaction found",
                    data: Transaction
                })
            })
            .catch(function (err) {
                res.status(400).json({
                    message: "error get data Transaction",
                    error: err.message
                })
            })
        }else{
            res.status(400).json({
                message: "you are not authorized",
            })
        }
    })

    .catch(function(err){
        res.status(400).json({
            message:"user not found",
            error:err.message
        })
    })
}

const deleteTransaction = function (req, res) {
    Transaction.deleteOne({ _id: req.params.id })
        .then(function () {
            res.status(200).json({
                message: "delete success"
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "delete failed",
                error: err.message
            })
        })
}


module.exports = { addTransaction, getAllTransaction, getOneTransaction, deleteTransaction }