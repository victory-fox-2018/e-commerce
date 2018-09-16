require('dotenv').config();

const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const objectId = require('../helpers/objectId');
const crypt = require('../helpers/crypt');

module.exports = {

  checklogin: (req, res) => {

    let user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if(err) {
        res.status(401).json({
          message: 'invalid authentication'
        });
      } else {
        res.status(200).json({
          message: 'valid authentication',
          user: decoded
        });
      }
    });
  },

  signup: (req, res) => {
    let input = {
      name: req.body.name,
      email: req.body.email,
      password: crypt(req.body.password),
      loginType: 'app'
    }

    Customer.findOne({email: input.email})
    .then(customer => {
      if(!customer) {
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
      } else {
        res.status(500).json({
          message: 'Email already registered, please using other email'
        });
      }
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
          message: 'Username or Password wrong'
        });
      } else {
        let token = jwt.sign({
          id: customer._id,
          name: customer.name,
          email: customer.email
        }, process.env.JWT_SECRET_KEY);

        res.status(200).json({
          message: 'sign in success',
          userId: customer._id,
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