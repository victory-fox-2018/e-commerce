const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Customer = require('../models/Customer');

module.exports = {
  create: (req, res) => {
    let totalPrice = 0;
    if (typeof req.body.item == 'object') {
      let itemId = req.body.item;
      for (let i = 0; i < itemId.length; i++) {
        Item
          .findById(itemId)
          .then(datas => {
            totalPrice += datas.price
            if (i === itemId.length - 1) {
              Cart.create({
                customerId: req.body.customerId,
                listItem: itemId,
                totalPrice: totalPrice
              })
              .then(result => {
                res.status(200).json({ message: `Success bought many items` });
              })
              .catch(err => {
                res.status(500).json({ message: err });
              })
            }
          })
      }
    } else {
      Item
        .findById(req.body.item)
        .then(item => {
          return Cart.create({
            customerId: req.body.customerId,
            listItem: req.body.item,
            totalPrice: item.price
          })
        })
        .then(result => {
          res.status(200).json({ message: `Success bought an item`});
        })
        .catch(err => {
          res.status(500).json({ message: err });
        })
    }

  },

  read: (req, res) => {
    Cart
      .find({})
      .then(carts => {
        res.status(200).json({ carts });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })

  }

};