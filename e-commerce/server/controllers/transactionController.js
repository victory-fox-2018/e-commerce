const Transaction = require('../models/Transaction')

module.exports = {
    createTransaction: (req, res) => {
        let objTransaction = {
            user: req.decoded.id,
            products: req.body.products
        }
        Transaction.create(objTransaction)
        .then( response => {
            res.status(201).json(response)
        })
        .catch( err => {
            res.status(500).json({err})
        })
    },

    getTransaction: (req, res) => {
        Transaction.find({pay: false, user: req.decoded.id})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    }
}