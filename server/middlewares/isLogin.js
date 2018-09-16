require('dotenv').config();

const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) {
      res.status(401).json({
        message: 'invalid token'
      });
    } else {
      Customer.findOne({_id: decoded.id, email: decoded.email})
      .then(customer => {
        if(!customer) {
          res.status(401).json({
            message: 'invalid token'
          }); 
        } else {
          req.decoded = customer;
          next();
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
    }
  });
}