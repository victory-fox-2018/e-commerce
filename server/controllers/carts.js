const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      let totalPrice = 0;
      if (typeof req.body.itemsId == 'object') {
        Item
        .find({ _id: req.body.itemsId })
        .then(datas => {
          const customerId = decode.id;
          const listItem = [];
          for(let i = 0; i < datas.length; i++) {
            listItem.push(datas[i]._id)
            totalPrice += datas[i].price
          }
          // console.log('customer id ====> ', customerId);
          // console.log('listitem ====> ', listItem);
          // console.log(totalPrice);
          
            // if (i === datas.length - 1) {
              Cart.create({ customerId, listItem, totalPrice })
              .then(result => {
                console.log(result);
                console.log('berhasil');

                res.status(200).json({ message: `Kamu berhasil borong banyak item` });
              })
              .catch(err => {
                res.status(500).json({ message: err });
              })
            // }
        })        
        .catch(err => {
          console.log(err);

        })
      } else {
        // Cart.create({
        //   customerId: decode.id,
        //   listItem: req.body.itemsId,
        //   totalPrice: req.body.totalPrice
        // })
        
        // .then(result => {
        //   res.status(200).json({ message: `Kamu berhasil borong suatu item` });
        // })
        // .catch(err => {
        //   res.status(500).json({ message: err });
        // })
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