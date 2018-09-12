const Cart = require('../models/cart');
const objectId = require('../helpers/objectId');

module.exports = {
  create: (req, res) => {

    let cart = req.body.cart;
    let productId = cart.reduce((acc, obj) => {
      acc.push(obj.id);
      return acc;
    }, []);

    let input = {
      customerId: req.body.customerId,
      productId: productId
    }

    Cart.create(input)
    .then(newCart => {
      res.status(201).json({
        message: 'success create new transaction',
        cart: newCart
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });

    // res.status(200).json({
    //   customerId: input.customerId,
    //   productId: input.productId
    // });
  }
}