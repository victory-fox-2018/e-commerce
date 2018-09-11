const User = require('../models/user');

module.exports = {
  showAll: function(req,res) {
    User.find((err, users) => {
      if(!err) {
        res.status(200).json({
          message: 'find all user success!',
          data: users
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  },
  create: function(req,res) {
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      isRegisterViaFB: false
    })
      .then(user => {
        res.status(201).json({
          message: 'user created successfully!',
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
  erase: function(req,res) {
    User.deleteOne({ _id: req.body.id }, function (err) {
      if(!err) {
        res.status(200).json({
          message: 'user deleted successfully',
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  },
  edit: function(req,res) {
    User.findOne({ _id: req.body.id }, function(err,user) {
      if(!err) {
        if(user) {
          user.name = req.body.name
          user.password = req.body.password
          user.save()
          res.status(200).json({
            message: 'user edited successfully!'
          })
        } else {
          res.status(404).json({
            message:'user not found!'
          })
        }
      } else {
        res.status(500).json({
          message: err
        })
      }
    })
  }
}