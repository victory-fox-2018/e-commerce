const Cart = require('../models/cart')

module.exports = {
    add: (req, res) => {
        Cart.create({
            userId : req.decoded.id,
            itemId : req.body.itemId,
            total : req.body.total
        })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}