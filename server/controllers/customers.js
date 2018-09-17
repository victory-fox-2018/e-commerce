const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { encrypt } = require('../helpers/encrypt');

module.exports = {
  signin: (req, res) => {
    
    Customer
      .findOne({
        email: req.body.email,
        password: encrypt(req.body.password)
      })
      .then(customer => {
        
        if(customer) {
          const id = customer._id;
          
          jwt.sign({
            id,
            name: customer.name,
            email: customer.email
          }, process.env.SECRET, (err, token) => {
            
            res.status(200).json({
              message: `Berhail masuk`,
              token, name: customer.name
            })
          })
        } else {
          res.status(400).json({ message: 'Pengguna tidak tidak ditemukan' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })

    
  },

  signup: (req, res) => {
    console.log(req.body);
    
    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      password: encrypt(req.body.password),
      phone: req.body.phone
    });

    newCustomer
      .save()
      .then(Customer => {
        res.status(200).json({
          message: `Selamat ${Customer.name}, sekarang kamu sudah terdaftar sebagai Customer Borong-borong `
        })
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  update: (req, res) => {
    Customer
      .where({_id: req.params.id})
      .update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      })
      .then(updated => {
        if(updated.n) {
          res.status(200).json({
            message: `Data Profilmu sudah diperbarui`
          })
        } else {
          res.status(400).json({
            message: `Data tidak ditemukan`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  },

  remove: (req, res) => {
    Customer
      .deleteOne({_id: req.params.id})
      .then(deleted => {
        if(deleted.n) {
          res.status(200).json({
            message: `Customer has been deleted`
          })
        } else {
          res.status(400).json({
            message: `Data tidak ditemukan`
          })
        }
      })
      .catch(err => {
        console.log('error');
        
        res.status(500).json({ message: err });
      })
  },

  read: (req, res) => {
    Customer 
      .find({})
      .then(customers => {
        res.status(200).json({ customers });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  }

};