const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const objectId = require('../helpers/objectId');
const crypt = require('../helpers/crypt');

module.exports = {

  signup: (req, res) => {
    let input = {
      name: req.body.name,
      email: req.body.email,
      password: crypt(req.body.password),
      loginType: 'app'
    }

    Customer.create(input)
    .then(newCustomer => {
      res.status(201).json({
        message: 'success sign up',
        customer: newCustomer
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  },

  signin: (req, res) => {

    let input = {
      email: req.body.email,
      password: crypt(req.body.password)
    }

    Customer.findOne(input)
    .then(customer => {
      if(!customer) {
        res.status(500).json({
          message: 'no customer with this information, please sign up first'
        });
      } else {
        let token = jwt.sign({
          name: customer.name,
          email: customer.email
        }, process.env.JWT_SECRET_KEY);

        res.status(200).json({
          message: 'sign in success',
          token: token
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  }
}