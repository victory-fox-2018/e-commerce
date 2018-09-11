const User = require('../models/User')
const jwt = require('jsonwebtoken')
const encrypt = require('../helpers/encrypt')

class Controller {
  
  static register(req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.status(201).json({message: 'User created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static login(req, res) {
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    
    User.findOne({email: req.body.email, password: hashed})
      .then(user => {
        let obj = {
          id: user._id,
          name: user.name,
          emial: user.email
        }
        
        jwt.sign(obj, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            res.status(500).json({error: err.message})
          } else {
            res.status(200).json({message: 'Login berhasil!', token: token})
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller