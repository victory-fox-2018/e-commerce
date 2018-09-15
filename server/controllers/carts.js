const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      console.log(decode);
      let totalPrice = 0;
      if (typeof req.body.data == 'object') {
        // Item
        //   .find({ _id: req.body.itemsId })
        //   .then(datas => {
        //     console.log(datas);
  
        //     totalPrice += datas.price
        //     if (i === itemsId.length - 1) {
              Cart.create({
                customerId: req.body.customerId,
                listItem: itemsId,
                totalPrice: totalPrice
              })
              .then(result => {
                console.log('berhasil');
  
                res.status(200).json({ message: `Success bought many items` });
              })
              .catch(err => {
                res.status(500).json({ message: err });
              })
            // }
          // })
          // .catch(err => {
          //   console.log(err);
  
          // })
      } else {
        // Item
        //   .findById(req.body.item)
        //   .then(item => {
        //     return 
            Cart.create({
              customerId: req.body.customerId,
              listItem: req.body.item,
              totalPrice: item.price
            // })
          })
          .then(result => {
            res.status(200).json({ message: `Success bought an item` });
          })
          .catch(err => {
            res.status(500).json({ message: err });
          })
      }
    })

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